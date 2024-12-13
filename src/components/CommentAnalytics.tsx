import React from 'react';
import { PieChart, BarChart2, TrendingUp } from 'lucide-react';
import { useAppStore } from '../lib/store';

export function CommentAnalytics() {
  const { comments } = useAppStore();

  const sentimentStats = comments.reduce(
    (acc, comment) => {
      if (comment.sentiment) {
        acc[comment.sentiment]++;
      }
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const languageStats = comments.reduce((acc: Record<string, number>, comment) => {
    if (comment.language) {
      acc[comment.language] = (acc[comment.language] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
          <PieChart className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Positive</span>
            <span className="text-green-500">{sentimentStats.positive}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Neutral</span>
            <span className="text-gray-500">{sentimentStats.neutral}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Negative</span>
            <span className="text-red-500">{sentimentStats.negative}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Language Distribution</h3>
          <BarChart2 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          {Object.entries(languageStats).map(([lang, count]) => (
            <div key={lang} className="flex justify-between items-center">
              <span>{lang.toUpperCase()}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Response Performance</h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Average Response Time</span>
            <span>2.5s</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Success Rate</span>
            <span className="text-green-500">95%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Engagement Rate</span>
            <span className="text-blue-500">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
}