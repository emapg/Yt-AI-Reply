import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVideoComments, postCommentReply } from '../api/youtube';
import { generateAIReply } from '../api/openai';
import { useAppStore } from '../store';
import { useAuthStore } from '../auth';
import toast from 'react-hot-toast';

export function useComments(videoId: string) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore();
  const { video, actions } = useAppStore();

  const commentsQuery = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getVideoComments(videoId),
    enabled: !!videoId,
    onSuccess: (comments) => actions.setComments(comments),
  });

  const generateReplyMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const comment = commentsQuery.data?.find((c) => c.id === commentId);
      if (!comment || !video) return null;

      const startTime = performance.now();
      const aiResponse = await generateAIReply(comment.textDisplay, {
        videoTitle: video.title,
        channelName: video.channelTitle,
      });
      const endTime = performance.now();

      actions.updateStatistics({
        averageResponseTime: (endTime - startTime) / 1000,
      });

      return { commentId, aiResponse };
    },
    onSuccess: (data) => {
      if (!data) return;
      
      const { commentId, aiResponse } = data;
      const updatedComments = commentsQuery.data?.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              aiReply: aiResponse.reply,
              sentiment: aiResponse.sentiment,
              language: aiResponse.language,
            }
          : comment
      );

      if (updatedComments) {
        queryClient.setQueryData(['comments', videoId], updatedComments);
      }
    },
  });

  const submitReplyMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const comment = commentsQuery.data?.find((c) => c.id === commentId);
      if (!comment?.aiReply || !accessToken) return;

      await postCommentReply(commentId, comment.aiReply, accessToken);
      return commentId;
    },
    onSuccess: (commentId) => {
      if (!commentId) return;
      
      actions.updateStatistics((prev) => ({
        totalReplies: prev.totalReplies + 1,
        successfulReplies: prev.successfulReplies + 1,
      }));

      toast.success('Reply posted successfully');
    },
    onError: (error) => {
      actions.updateStatistics((prev) => ({
        totalReplies: prev.totalReplies + 1,
        failedReplies: prev.failedReplies + 1,
      }));

      toast.error('Failed to post reply');
    },
  });

  return {
    comments: commentsQuery.data,
    isLoading: commentsQuery.isLoading,
    error: commentsQuery.error,
    generateReply: generateReplyMutation.mutate,
    submitReply: submitReplyMutation.mutate,
    isGenerating: generateReplyMutation.isLoading,
    isSubmitting: submitReplyMutation.isLoading,
  };
}