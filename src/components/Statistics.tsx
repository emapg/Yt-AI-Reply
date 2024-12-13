import React from 'react';
import { BarChart, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAppStore } from '../lib/store';

export function Statistics() {
  const { statistics } = useAppStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Replies</p>
            <p className="text-2xl font-semibold">{statistics.totalReplies}</p>
          </div>
          <BarChart className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Successful Replies</p>
            <p className="text-2xl font-semibold">{statistics.successfulReplies}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Failed Replies</p>
            <p className="text-2xl font-semibold">{statistics.failedReplies}</p>
          </div>
          <XCircle className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg. Response Time</p>
            <p className="text-2xl font-semibold">
              {statistics.averageResponseTime.toFixed(1)}s
            </p>
          </div>
          <Clock className="h-8 w-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}