import axios from 'axios';
import { VideoDetails, Comment } from '../types';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
    params: {
      part: 'snippet',
      id: videoId,
      key: YOUTUBE_API_KEY,
    },
  });

  const video = response.data.items[0];
  return {
    id: video.id,
    title: video.snippet.title,
    thumbnailUrl: video.snippet.thumbnails.high.url,
    channelTitle: video.snippet.channelTitle,
  };
}

export async function getVideoComments(videoId: string): Promise<Comment[]> {
  const response = await axios.get(`${YOUTUBE_API_URL}/commentThreads`, {
    params: {
      part: 'snippet',
      videoId,
      key: YOUTUBE_API_KEY,
      maxResults: 50,
      order: 'relevance',
    },
  });

  return response.data.items.map((item: any) => ({
    id: item.id,
    authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
    authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
    textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
    publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    likeCount: item.snippet.topLevelComment.snippet.likeCount,
  }));
}

export async function postCommentReply(
  commentId: string,
  text: string,
  accessToken: string
): Promise<void> {
  await axios.post(
    `${YOUTUBE_API_URL}/comments`,
    {
      snippet: {
        parentId: commentId,
        textOriginal: text,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
      },
    }
  );
}