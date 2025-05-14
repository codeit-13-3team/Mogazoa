// src/stores/authStore.ts
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

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
}));

export default useAuthStore;
