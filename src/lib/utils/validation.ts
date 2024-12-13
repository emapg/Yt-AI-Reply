import { z } from 'zod';

export const videoUrlSchema = z.string().refine(
  (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    return regExp.test(url);
  },
  {
    message: 'Invalid YouTube URL format',
  }
);

export const replyTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  content: z.string().min(1, 'Template content is required'),
  tags: z.array(z.string()),
  tone: z.enum(['professional', 'casual', 'friendly']),
  language: z.string(),
});

export const settingsSchema = z.object({
  aiModel: z.string(),
  replyTone: z.enum(['professional', 'casual', 'friendly']),
  autoModeration: z.boolean(),
  language: z.string(),
  maxReplyLength: z.number().min(1).max(1000),
});