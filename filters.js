/*
 * filters.js
 * Filtering and sorting utilities for the apartment listings.
 */

/**
 * Apply filter criteria to a list of items.
 *
 * @param {Array} items List of listing objects
 * @param {Object} f Filter options: { maxRent, minRating, beds, pets, searchTerm }
 * @returns {Array}
 */
export function applyFilters(items, f) {
  return items.filter(i =>
    i.rent <= (f.maxRent ?? Infinity) &&
    i.rating >= (f.minRating ?? 0) &&
    (!f.beds || i.beds === f.beds) &&
    (!f.pets || i.pets) &&
    (!f.searchTerm || i.name.toLowerCase().includes(f.searchTerm.toLowerCase()))
  );
}

/**
 * Sort an array of items by a key.
 * Supported keys: 'price', 'distance', 'value', 'rating'.
 *
 * @param {Array} items List of listing objects
 * @param {string} key The sort key
 * @returns {Array} A new sorted array
 */
export function sortBy(items, key) {
  const copy = items.slice();
  const cmp = {
    price: (a, b) => a.rent - b.rent,
    distance: (a, b) => a.distanceKm - b.distanceKm,
    value: (a, b) => b.valueScore - a.valueScore,
    rating: (a, b) => b.rating - a.rating
  }[key] || (() => 0);
  return copy.sort(cmp);
}
