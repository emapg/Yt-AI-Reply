export interface Comment {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
  likeCount: number;
  aiReply?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  language?: string;
  status?: 'pending' | 'approved' | 'rejected';
  moderationFlags?: string[];
  replyHistory?: Array<{
    text: string;
    timestamp: string;
    success: boolean;
  }>;
}

export interface VideoDetails {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  statistics?: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
  };
  publishedAt: string;
  description?: string;
}

export interface ReplyTemplate {
  id: string;
  name: string;
  content: string;
  tags: string[];
  tone: 'professional' | 'casual' | 'friendly';
  language: string;
  useCount: number;
  lastUsed?: string;
}

export interface AIResponse {
  reply: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  moderationFlags?: string[];
  language: string;
  suggestions?: string[];
}