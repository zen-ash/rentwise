/*
 * dom.js
 * DOM helpers for generating listing cards and other UI components.
 */

/**
 * Create a DOM element representing an apartment card.
 *
 * @param {Object} listing The apartment listing data
 * @param {boolean} isBookmarked Whether this listing is bookmarked
 * @returns {HTMLElement}
 */
export function createCard(listing, isBookmarked) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = listing.id;
  const bedLabel = listing.beds === 1 ? '1 bed' : `${listing.beds} beds`;
  // Build details HTML
  let details = '';
  details += `<span class="rent">$${listing.rent}</span>`;
  details += `<span class="distance">${listing.distanceKm.toFixed(2)} km</span>`;
  details += `<span class="rating">${listing.rating} ★</span>`;
  details += `<span class="beds">${bedLabel}</span>`;
  if (listing.pets) details += `<span class="badge pets">Pets OK</span>`;
  if (listing.furnished) details += `<span class="badge furnished">Furnished</span>`;
  card.innerHTML = `
    <div class="card-title">${listing.name}</div>
    <div class="card-details">${details}</div>
    <button class="bookmark" aria-label="Bookmark ${listing.name}">${isBookmarked ? '♥' : '♡'}</button>
  `;
  return card;
}
