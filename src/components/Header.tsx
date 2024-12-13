import React from 'react';
import { Youtube, LogOut } from 'lucide-react';
import { useAuthStore, signIn, signOut } from '../lib/auth';
import toast from 'react-hot-toast';

export function Header() {
  const { isAuthenticated } = useAuthStore();

  const handleSignIn = async () => {
    try {
      await signIn();
      toast.success('Signed in successfully');
    } catch (error) {
      toast.error('Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Youtube className="h-8 w-8 text-red-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              YouTube AI Reply Assistant
            </h1>
          </div>
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}