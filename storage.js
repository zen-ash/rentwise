/*
 * storage.js
 * Bookmark persistence layer using localStorage.
 */

const KEY = 'rentwise.bookmarks.v1';

/**
 * Retrieve a set of bookmarked listing IDs from localStorage.
 * @returns {Set<string>}
 */
export function getBookmarks() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(arr);
  } catch (e) {
    console.error('Failed to parse bookmarks from storage', e);
    return new Set();
  }
}

/**
 * Toggle a bookmark entry. Adds the ID if absent or removes it if present.
 * Saves the new set back to localStorage.
 *
 * @param {string} id Listing ID
 */
export function toggleBookmark(id) {
  const set = getBookmarks();
  if (set.has(id)) set.delete(id); else set.add(id);
  localStorage.setItem(KEY, JSON.stringify([...set]));
}
