"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 400));
        if (!email.trim() || password.length < 6) return false;
        set({ isAuthenticated: true, userEmail: email.trim() });
        return true;
      },

      logout: () => set({ isAuthenticated: false, userEmail: null }),
    }),
    { name: "mobiq-auth" },
  ),
);
