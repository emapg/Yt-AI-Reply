import { useQuery } from '@tanstack/react-query';
import { getVideoDetails } from '../api/youtube';
import { extractVideoId } from '../utils/youtube';
import { useAppStore } from '../store';

export function useVideo(videoUrl: string) {
  const { actions } = useAppStore();
  const videoId = extractVideoId(videoUrl);

  const videoQuery = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: !!videoId,
    onSuccess: (video) => actions.setVideo(video),
  });

  return {
    video: videoQuery.data,
    isLoading: videoQuery.isLoading,
    error: videoQuery.error,
  };
}