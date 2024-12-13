import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { VideoInput } from './components/VideoInput';
import { VideoDetails } from './components/VideoDetails';
import { CommentList } from './components/CommentList';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';
import { ReplyTemplates } from './components/ReplyTemplates';
import { CommentAnalytics } from './components/CommentAnalytics';
import { useAppStore } from './lib/store';

const queryClient = new QueryClient();

function AppContent() {
  const { video, comments } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Statistics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <VideoInput />
            {video && <VideoDetails video={video} />}
          </div>
          <div>
            <Settings />
          </div>
        </div>

        {comments.length > 0 && (
          <>
            <div className="mb-8">
              <CommentAnalytics />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CommentList
                  comments={comments}
                  onGenerateReply={() => {}}
                  onUpdateReply={() => {}}
                  onSubmitReply={() => {}}
                />
              </div>
              <div>
                <ReplyTemplates />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;