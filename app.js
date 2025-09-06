app.js/*
 * app.js
 * Entry point for RentWise – Student Housing Comparator.
 * Handles loading data, computing distances and scores, filtering, sorting and rendering.
 */

import { haversine } from './distance.js';
import { computeStats, computeValueScore } from './score.js';
import { applyFilters, sortBy } from './filters.js';
import { getBookmarks, toggleBookmark } from './storage.js';
import { createCard } from './dom.js';

// Coordinates of the reference campus (Georgia State University in Atlanta)
const CAMPUS = { lat: 33.7490, lon: -84.3880 };

// Application state
let listings = [];
let stats;
let filters = {
  maxRent: Infinity,
  minRating: 0,
  beds: null,
  pets: false,
  searchTerm: ''
};
let sortKey = 'value';

/**
 * Initialize the application: load data, compute distances and scores, setup filters and render.
 */
async function init() {
  try {
    const response = await fetch('listings.json');
    const data = await response.json();
    // Compute distance for each listing
    data.forEach(item => {
      item.distanceKm = haversine(CAMPUS.lat, CAMPUS.lon, item.lat, item.lon);
    });
    // Compute basic stats and initial value scores
    stats = computeStats(data);
    data.forEach(item => {
      item.valueScore = computeValueScore(item, stats);
    });
    listings = data;
    setupFilters();
    render();
  } catch (err) {
    console.error('Failed to initialize app', err);
    const container = document.getElementById('cards');
    if (container) container.innerText = 'Failed to load listings.';
  }
}

/**
 * Setup filter UI event listeners and default values.
 */
function setupFilters() {
  const searchInput = document.getElementById('search');
  const maxRentInput = document.getElementById('max-rent');
  const minRatingInput = document.getElementById('min-rating');
  const bedsSelect = document.getElementById('beds');
  const petsCheck = document.getElementById('pets');
  const sortSelect = document.getElementById('sort');

  searchInput.addEventListener('input', () => {
    filters.searchTerm = searchInput.value.trim();
    render();
  });
  maxRentInput.addEventListener('input', () => {
    const val = parseFloat(maxRentInput.value);
    filters.maxRent = isNaN(val) ? Infinity : val;
    render();
  });
  minRatingInput.addEventListener('input', () => {
    const val = parseFloat(minRatingInput.value);
    filters.minRating = isNaN(val) ? 0 : val;
    render();
  });
  bedsSelect.addEventListener('change', () => {
    const v = bedsSelect.value;
    filters.beds = v ? parseInt(v) : null;
    render();
  });
  petsCheck.addEventListener('change', () => {
    filters.pets = petsCheck.checked;
    render();
  });
  sortSelect.addEventListener('change', () => {
    sortKey = sortSelect.value;
    render();
  });
}

/**
 * Render the list of cards based on current filters and sorting.
 */
function render() {
  const container = document.getElementById('cards');
  const countEl = document.getElementById('count');
  if (!container) return;
  // Clear previous content
  container.innerHTML = '';
  // Grab current bookmarks
  const bookmarks = getBookmarks();
  // Filter and sort listings
  let results = applyFilters(listings, filters);
  // Recompute value scores for dynamic filtering
  results.forEach(item => {
    item.valueScore = computeValueScore(item, stats);
  });
  results = sortBy(results, sortKey);
  // Update count display
  if (countEl) {
    countEl.textContent = `Showing ${results.length} of ${listings.length}`;
  }
  // Generate cards
  results.forEach(item => {
    const card = createCard(item, bookmarks.has(item.id));
    const bookmarkButton = card.querySelector('.bookmark');
    bookmarkButton.addEventListener('click', () => {
      toggleBookmark(item.id);
      // re-render to update bookmark state
      render();
    });
    container.appendChild(card);
  });
}

// Run init on DOM ready
window.addEventListener('DOMContentLoaded', init);
