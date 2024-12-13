import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAppStore } from '../lib/store';
import type { ReplyTemplate } from '../types';

export function ReplyTemplates() {
  const { replyTemplates, actions } = useAppStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<ReplyTemplate | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const template: ReplyTemplate = {
      id: editingTemplate?.id || Date.now().toString(),
      name: formData.get('name') as string,
      content: formData.get('content') as string,
      tags: (formData.get('tags') as string).split(',').map((t) => t.trim()),
      tone: formData.get('tone') as any,
      language: formData.get('language') as string,
      useCount: editingTemplate?.useCount || 0,
    };

    actions.addReplyTemplate(template);
    setIsEditing(false);
    setEditingTemplate(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Reply Templates</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Template
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Template Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingTemplate?.name}
              className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              defaultValue={editingTemplate?.content}
              className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <select
                name="tone"
                defaultValue={editingTemplate?.tone}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                name="language"
                defaultValue={editingTemplate?.language}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              defaultValue={editingTemplate?.tags.join(', ')}
              placeholder="Enter tags separated by commas"
              className="w-full rounded-md border-gray-300 dark:bg-gray-700"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingTemplate(null);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Template
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {replyTemplates.map((template) => (
          <div
            key={template.id}
            className="border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Used {template.useCount} times
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingTemplate(template);
                    setIsEditing(true);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => actions.removeReplyTemplate(template.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm">{template.content}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}