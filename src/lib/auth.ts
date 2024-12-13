import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: !!token }),
}));

export async function initializeGoogleAuth() {
  await new Promise((resolve) => gapi.load('client:auth2', resolve));
  await gapi.client.init({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
  });
}

export async function signIn() {
  try {
    const googleAuth = gapi.auth2.getAuthInstance();
    const user = await googleAuth.signIn();
    const token = user.getAuthResponse().access_token;
    useAuthStore.getState().setAccessToken(token);
    return token;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
    useAuthStore.getState().setAccessToken(null);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}