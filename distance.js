/*
 * distance.js
 * Helper functions for calculating distances between two geo coordinates using the Haversine formula.
 */

// Earth radius in kilometers
const R = 6371;

/**
 * Convert degrees to radians.
 * @param {number} degrees
 * @returns {number}
 */
function toRad(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Calculate the great-circle distance between two points given their latitude and longitude using the Haversine formula.
 * @param {number} lat1 Latitude of first point
 * @param {number} lon1 Longitude of first point
 * @param {number} lat2 Latitude of second point
 * @param {number} lon2 Longitude of second point
 * @returns {number} Distance in kilometers
 */
export function haversine(lat1, lon1, lat2, lon2) {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
