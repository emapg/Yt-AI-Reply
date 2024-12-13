import { useQuery, useMutation } from '@tanstack/react-query';
import { getVideoDetails, getVideoComments } from '../lib/youtube';
import { extractVideoId } from '../utils/youtube';

export function useVideo(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);

  const videoQuery = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: !!videoId,
  });

  const commentsQuery = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getVideoComments(videoId),
    enabled: !!videoId,
  });

  return {
    video: videoQuery.data,
    comments: commentsQuery.data,
    isLoading: videoQuery.isLoading || commentsQuery.isLoading,
    error: videoQuery.error || commentsQuery.error,
  };
}