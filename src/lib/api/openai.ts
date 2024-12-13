import axios from 'axios';
import { AIResponse } from '../../types';
import { handleApiError } from '../utils/error';
import { useAppStore } from '../store';

const AI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';

const openaiApi = axios.create({
  baseURL: AI_API_URL,
  headers: {
    Authorization: `Bearer ${AI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function generateAIReply(
  comment: string,
  context: {
    videoTitle: string;
    channelName: string;
    tone?: string;
    language?: string;
  }
): Promise<AIResponse> {
  try {
    const settings = useAppStore.getState().settings;
    
    const systemPrompt = `You are a helpful YouTube channel owner (${context.channelName}) responding to comments on your video "${context.videoTitle}". 
    Generate a ${settings.replyTone} reply in ${settings.language} language.
    Keep the response under ${settings.maxReplyLength} characters.`;

    const response = await openaiApi.post('', {
      model: settings.aiModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: comment },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return {
      reply: response.data.choices[0].message.content,
      sentiment: analyzeSentiment(comment),
      confidence: response.data.choices[0].finish_reason === 'stop' ? 0.9 : 0.7,
      language: settings.language,
      suggestions: generateSuggestions(comment),
    };
  } catch (error) {
    throw handleApiError(error, 'Failed to generate AI reply');
  }
}

function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  // Simple sentiment analysis logic (replace with more sophisticated implementation)
  const positiveWords = ['great', 'awesome', 'good', 'love', 'excellent'];
  const negativeWords = ['bad', 'poor', 'terrible', 'hate', 'awful'];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

function generateSuggestions(comment: string): string[] {
  // Implement suggestion generation logic
  return [
    'Thank them for their feedback',
    'Address specific points mentioned',
    'Invite them to subscribe for more content',
  ];
}