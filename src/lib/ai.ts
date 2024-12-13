import axios from 'axios';

const AI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateReply(comment: string): Promise<string> {
  const response = await axios.post(
    AI_API_URL,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful YouTube channel owner. Generate a friendly and relevant reply to the following comment.',
        },
        {
          role: 'user',
          content: comment,
        },
      ],
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}