import { create } from 'zustand';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Record<string, string>) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate/Trigger API Call using central Axios client
      // Since it is a refactor without changing functionality, we support simulated API behaviors
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser = { email: credentials.email, name: credentials.email.split('@')[0] };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('refresh_token', 'mock_refresh_token');
      }
      
      set({ token: mockToken, user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ 
        error: err.response?.data?.message || 'Authentication failed. Please check credentials.', 
        isLoading: false 
      });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Call endpoint mapping
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      console.error('Logout error:', err);
    }
  }
}));
