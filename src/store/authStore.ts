// Auth Store – manages current user session (mock JWT-based auth)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';
import { MOCK_USERS, DEMO_CREDENTIALS } from '../data/mockData';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'dark' | 'light';
  language: 'en' | 'ta';

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: 'en' | 'ta') => void;
  updateUser: (updates: Partial<User>) => void;
}

// Generate a mock JWT-like token
const mockToken = (userId: string) =>
  btoa(JSON.stringify({ sub: userId, iat: Date.now(), exp: Date.now() + 86400000 }));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      theme: 'dark',
      language: 'en',

      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));
        
        const cred = DEMO_CREDENTIALS.find(c => c.email === email && password === 'demo123');
        if (!cred) {
          set({ isLoading: false });
          return { success: false, error: 'Invalid credentials. Try demo password: demo123' };
        }
        
        const user = MOCK_USERS.find(u => u.email === email);
        if (!user) {
          set({ isLoading: false });
          return { success: false, error: 'User not found' };
        }
        
        const token = mockToken(user.id);
        set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', get().theme);
        return { success: true };
      },

      loginAsRole: (role) => {
        const cred = DEMO_CREDENTIALS.find(c => c.role === role);
        const user = MOCK_USERS.find(u => u.role === role);
        if (user && cred) {
          const token = mockToken(user.id);
          set({ user, accessToken: token, isAuthenticated: true });
          document.documentElement.setAttribute('data-theme', get().theme);
        }
      },

      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      setLanguage: (language) => {
        set({ language });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (current) set({ user: { ...current, ...updates } });
      },
    }),
    {
      name: 'skillsetu-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
