"use client";

import { create } from "zustand";

interface UIState {
  /** Current theme: 'dark' | 'light' */
  theme: "dark" | "light";
  /** Mobile menu open state */
  isMobileMenuOpen: boolean;
  /** Video dialog open state + current video URL */
  videoDialog: { isOpen: boolean; src: string; type: "youtube" | "vimeo" | "mp4" };
  /** Loading state */
  isLoading: boolean;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openVideoDialog: (src: string, type?: "youtube" | "vimeo" | "mp4") => void;
  closeVideoDialog: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: "light",
  isMobileMenuOpen: false,
  videoDialog: { isOpen: false, src: "", type: "youtube" },
  isLoading: true,

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return { theme: next };
    }),

  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
    set({ theme });
  },

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openVideoDialog: (src, type = "youtube") =>
    set({ videoDialog: { isOpen: true, src, type } }),

  closeVideoDialog: () =>
    set({ videoDialog: { isOpen: false, src: "", type: "youtube" } }),

  setLoading: (isLoading) => set({ isLoading }),
}));
