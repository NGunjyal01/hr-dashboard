import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (employeeId) => {
        const current = get().bookmarks;
        const updated = current.includes(employeeId)
          ? current.filter((id) => id !== employeeId)
          : [...current, employeeId];
        set({ bookmarks: updated });
      },
    }),
    {
      name: "hr-bookmarks", // LocalStorage key
    }
  )
);
