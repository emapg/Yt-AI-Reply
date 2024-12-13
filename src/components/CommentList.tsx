import React from 'react';
import { Comment } from '../types';
import { MessageSquare, ThumbsUp, Send } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  onGenerateReply: (commentId: string) => void;
  onUpdateReply: (commentId: string, reply: string) => void;
  onSubmitReply: (commentId: string) => void;
}

export function CommentList({
  comments,
  onGenerateReply,
  onUpdateReply,
  onSubmitReply,
}: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <div className="flex items-start space-x-4">
            <img
              src={comment.authorProfileImageUrl}
              alt={comment.authorDisplayName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {comment.authorDisplayName}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{comment.textDisplay}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {comment.likeCount}
                </div>
                <button className="flex items-center hover:text-blue-600">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Reply
                </button>
              </div>
              
              {comment.aiReply && (
                <div className="mt-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <textarea
                      value={comment.aiReply}
                      onChange={(e) => onUpdateReply(comment.id, e.target.value)}
                      className="w-full min-h-[100px] bg-transparent border-0 focus:ring-0 text-gray-600 dark:text-gray-300"
                    />
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        onClick={() => onGenerateReply(comment.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={() => onSubmitReply(comment.id)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Submit Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}