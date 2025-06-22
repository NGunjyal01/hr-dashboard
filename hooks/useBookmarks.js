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
    const updated = bookmarks.includes(employeeId)
      ? bookmarks.filter((id) => id !== employeeId)
      : [...bookmarks, employeeId];

    setBookmarks(updated);
    localStorage.setItem("hr-bookmarks", JSON.stringify(updated));
  };

  return { bookmarks, toggleBookmark };
};
