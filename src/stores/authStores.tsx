import { create } from 'zustand';
import { GetMeResponse } from '@/types/user';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: GetMeResponse | null;
  setUser: (user: GetMeResponse | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  setIsLoggedIn: (value: boolean) => {
    set({ isLoggedIn: value });

    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.removeItem('isLoggedIn');
      }
    }
  },

  setUser: (user) => {
    set({ user, isLoggedIn: !!user });
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  },
}));

export default useAuthStore;
