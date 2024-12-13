import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { useAppStore } from '../lib/store';

export function Settings() {
  const { settings, actions } = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    actions.updateSettings({
      aiModel: formData.get('aiModel') as string,
      replyTone: formData.get('replyTone') as any,
      autoModeration: formData.get('autoModeration') === 'true',
      language: formData.get('language') as string,
      maxReplyLength: Number(formData.get('maxReplyLength')),
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">AI Model</label>
              <select
                name="aiModel"
                defaultValue={settings.aiModel}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reply Tone</label>
              <select
                name="replyTone"
                defaultValue={settings.replyTone}
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
                defaultValue={settings.language}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Max Reply Length
              </label>
              <input
                type="number"
                name="maxReplyLength"
                defaultValue={settings.maxReplyLength}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="autoModeration"
                defaultChecked={settings.autoModeration}
                className="rounded border-gray-300"
              />
              <label className="ml-2 text-sm">Enable Auto-Moderation</label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </form>
        </div>
      )}
    </div>
  );
}