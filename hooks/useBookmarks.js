"use client";

import { useState, useEffect } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hr-bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load bookmarks from localStorage", err);
    }
  }, []);

  const toggleBookmark = (employeeId) => {
    setBookmarks((prev) => {
      const updated = prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId];

      localStorage.setItem("hr-bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return { bookmarks, toggleBookmark };
};
