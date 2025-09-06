export function normalizeMinMax(val, min, max) {
  if (max === min) return 0.5;
  return (val - min) / (max - min);
}

// Lower price & distance are better; higher rating better.
export function computeValueScore(item, stats, w = {price: 0.5, dist: 0.3, rating: 0.2}) {
  const p = normalizeMinMax(item.rent, stats.minRent, stats.maxRent);
  const d = normalizeMinMax(item.distanceKm, stats.minDist, stats.maxDist);
  const r = normalizeMinMax(item.rating, stats.minRating, stats.maxRating);
  return 100 * (w.price * (1 - p) + w.dist * (1 - d) + w.rating * (r));
}

export function computeStats(items) {
  const rents = items.map(i => i.rent);
  const dists = items.map(i => i.distanceKm);
  const rates = items.map(i => i.rating);
  return {
    minRent: Math.min(...rents), maxRent: Math.max(...rents),
    minDist: Math.min(...dists), maxDist: Math.max(...dists),
    minRating: Math.min(...rates), maxRating: Math.max(...rates)
  };
}
