import React from 'react';
import { VideoDetails as VideoDetailsType } from '../types';

interface VideoDetailsProps {
  video: VideoDetailsType;
}

export function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden dark:bg-gray-800">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {video.title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {video.channelTitle}
        </p>
      </div>
    </div>
  );
}