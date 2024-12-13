import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment, VideoDetails, ReplyTemplate } from '../types';

interface AppState {
  comments: Comment[];
  video: VideoDetails | null;
  replyTemplates: ReplyTemplate[];
  settings: {
    aiModel: string;
    replyTone: 'professional' | 'casual' | 'friendly';
    autoModeration: boolean;
    language: string;
    maxReplyLength: number;
  };
  statistics: {
    totalReplies: number;
    successfulReplies: number;
    failedReplies: number;
    averageResponseTime: number;
  };
  actions: {
    setComments: (comments: Comment[]) => void;
    setVideo: (video: VideoDetails | null) => void;
    addReplyTemplate: (template: ReplyTemplate) => void;
    removeReplyTemplate: (id: string) => void;
    updateSettings: (settings: Partial<AppState['settings']>) => void;
    updateStatistics: (stats: Partial<AppState['statistics']>) => void;
  };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      comments: [],
      video: null,
      replyTemplates: [],
      settings: {
        aiModel: 'gpt-3.5-turbo',
        replyTone: 'professional',
        autoModeration: true,
        language: 'en',
        maxReplyLength: 500,
      },
      statistics: {
        totalReplies: 0,
        successfulReplies: 0,
        failedReplies: 0,
        averageResponseTime: 0,
      },
      actions: {
        setComments: (comments) => set({ comments }),
        setVideo: (video) => set({ video }),
        addReplyTemplate: (template) =>
          set((state) => ({
            replyTemplates: [...state.replyTemplates, template],
          })),
        removeReplyTemplate: (id) =>
          set((state) => ({
            replyTemplates: state.replyTemplates.filter((t) => t.id !== id),
          })),
        updateSettings: (newSettings) =>
          set((state) => ({
            settings: { ...state.settings, ...newSettings },
          })),
        updateStatistics: (newStats) =>
          set((state) => ({
            statistics: { ...state.statistics, ...newStats },
          })),
      },
    }),
    {
      name: 'youtube-ai-reply-storage',
    }
  )
);