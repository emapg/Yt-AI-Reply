import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Loader2 } from 'lucide-react';
import { Comment } from '../types';
import { formatCommentDate } from '../utils/youtube';
import { useAuthStore } from '../lib/auth';
import toast from 'react-hot-toast';

interface CommentItemProps {
  comment: Comment;
  onGenerateReply: (commentId: string) => Promise<void>;
  onUpdateReply: (commentId: string, reply: string) => void;
  onSubmitReply: (commentId: string) => Promise<void>;
}

export function CommentItem({
  comment,
  onGenerateReply,
  onUpdateReply,
  onSubmitReply,
}: CommentItemProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleGenerateReply = async () => {
    try {
      setIsGenerating(true);
      await onGenerateReply(comment.id);
      toast.success('Reply generated successfully');
    } catch (error) {
      toast.error('Failed to generate reply');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to submit replies');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmitReply(comment.id);
      toast.success('Reply submitted successfully');
    } catch (error) {
      toast.error('Failed to submit reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
      <div className="flex items-start space-x-4">
        <img
          src={comment.authorProfileImageUrl}
          alt={comment.authorDisplayName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {comment.authorDisplayName}
            </h3>
            <span className="text-sm text-gray-500">
              {formatCommentDate(comment.publishedAt)}
            </span>
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{comment.textDisplay}</p>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {comment.likeCount}
            </div>
            <button
              onClick={handleGenerateReply}
              disabled={isGenerating}
              className="flex items-center hover:text-blue-600 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <MessageSquare className="h-4 w-4 mr-1" />
              )}
              Generate Reply
            </button>
          </div>
          
          {comment.aiReply && (
            <div className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <textarea
                  value={comment.aiReply}
                  onChange={(e) => onUpdateReply(comment.id, e.target.value)}
                  className="w-full min-h-[100px] bg-transparent border-0 focus:ring-0 text-gray-600 dark:text-gray-300"
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    onClick={handleGenerateReply}
                    disabled={isGenerating}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    disabled={isSubmitting || !isAuthenticated}
                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-1" />
                    )}
                    Submit Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}