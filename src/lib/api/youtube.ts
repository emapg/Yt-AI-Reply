import axios from 'axios';
import { VideoDetails, Comment } from '../../types';
import { handleApiError } from '../utils/error';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: YOUTUBE_API_URL,
  params: {
    key: YOUTUBE_API_KEY,
  },
});

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoId,
      },
    });

    const video = response.data.items[0];
    return {
      id: video.id,
      title: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      statistics: {
        viewCount: Number(video.statistics.viewCount),
        likeCount: Number(video.statistics.likeCount),
        commentCount: Number(video.statistics.commentCount),
      },
      publishedAt: video.snippet.publishedAt,
      description: video.snippet.description,
    };
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch video details');
  }
}