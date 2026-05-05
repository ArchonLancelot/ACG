const ACG_CARDS = [];

const ACG_UPDATES = [
  {
    version: "v0.04",
    title: "Clean archive reset",
    date: "2026-05-05",
    summary: "Cleared the placeholder cards so the public archive stays clean until real card information is ready.",
    changes: [
      "Removed all temporary sample cards from the card archive.",
      "Kept the wiki structure, filters, detail pages, and update log ready for real card data.",
      "Improved the empty archive message so visitors understand that official cards are coming later."
    ]
  },
  {
    version: "v0.03",
    title: "Public-link deployment prep and bug fixes",
    date: "2026-04-21",
    summary: "Prepared the static site for stable public hosting and improved a few browser-side behaviors.",
    changes: [
      "Added a deployment-ready docs folder target for GitHub Pages.",
      "Improved image fallback behavior for missing card art.",
      "Made search, filters, and sort settings persist in the page URL."
    ]
  },
  {
    version: "v0.02",
    title: "One-click local browser edition",
    date: "2026-04-14",
    summary: "Added a version of ACG that opens directly as a browser site without needing Node.js or a local server.",
    changes: [
      "Created a one-click launcher for opening the site.",
      "Built file-based card archive, card detail, and updates pages.",
      "Kept search, filters, sorting, and responsive layout in the local version."
    ]
  },
  {
    version: "v0.01",
    title: "ACG wiki foundation",
    date: "2026-04-14",
    summary: "First build of the site with a searchable card archive, dynamic card pages, and a dedicated update log.",
    changes: [
      "Created the main card collection page with responsive grid layout.",
      "Added flexible JSON-based card storage for future card creation.",
      "Built individual card detail pages with stat panels and keyword tags.",
      "Added an updates page for version notes and future announcements."
    ]
  }
];
