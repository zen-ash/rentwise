# RentWise — Student Housing Comparator

An interactive web app for comparing student housing options near campus by price, distance, rating, amenities and an overall value score. Built with vanilla HTML, CSS and JavaScript with no external frameworks.

## Demo

The live demo will be available soon once this repository is published via GitHub Pages.

## Features

- **Rich filters & sorts**: search by name, cap maximum rent, set a minimum rating, choose the number of beds, filter pet‑friendly listings and sort by value score, price, distance or rating.
- **Value score**: a composite ranking that weighs rent, distance and rating to help you find the best bang for your buck.
- **Accurate distance**: uses the Haversine formula to compute distance to a fixed campus coordinate.
- **Bookmarks**: save favourites across sessions using browser `localStorage`.
- **Responsive design**: mobile‑friendly card grid with accessible controls and ARIA labels.

## Technology

- **HTML/CSS/JS**: built using modern web standards and ES modules—no frameworks or bundlers.
- **Haversine distance**: calculates real‑world distance between two coordinates.
- **Min‑max normalization & scoring**: normalizes prices, distances and ratings to compute a weighted value score.
- **Local storage**: persists bookmarks across browser sessions.

## Run locally

To run the app locally, simply open `index.html` in a modern browser. No build steps or servers are required. All data is loaded from the `listings.json` file in the project root.

## Data

The `listings.json` file seeds 10 sample listings. Each entry includes:

- `id`: unique identifier
- `name`: property name
- `lat` / `lon`: geographic coordinates
- `rent`: monthly rent in USD
- `beds`: number of bedrooms
- `rating`: 0–5 star rating
- `walkScore`: walking convenience metric
- `pets`: whether pets are allowed
- `furnished`: whether the unit comes furnished

You can modify or extend this dataset to include real listings or additional fields.

## Accessibility & Performance

- All interactive elements have appropriate `aria-label`s and keyboard focus styles for accessibility.
- Colour contrasts have been checked against WCAG 2.1 AA guidelines.
- Efficient filtering and rendering ensures smooth performance even on larger datasets.

## Roadmap

- [ ] CSV import/export for bulk editing listings
- [ ] Adjustable weight sliders for value scoring
- [ ] Map preview (without external libraries)

## License

This project is open source under the terms of the [MIT License](LICENSE).
