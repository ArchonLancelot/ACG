const ACG_CARDS = [
  {
    slug: "solar-dragoon",
    name: "Solar Dragoon",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    type: "Warrior",
    rarity: "Legendary",
    faction: "Sunforged",
    cost: 7,
    stats: {
      Attack: 9,
      Defense: 6,
      Speed: 4
    },
    description: "On summon, blaze one opposing unit and gain power for each radiant card in play.",
    tags: ["Radiant", "Summon", "Burn"],
    notes: "Sample card for the first version of the site. Replace with your real cards later.",
    releaseOrder: 1
  },
  {
    slug: "abyss-scribe",
    name: "Abyss Scribe",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
    type: "Caster",
    rarity: "Rare",
    faction: "Void Chorus",
    cost: 4,
    stats: {
      Attack: 3,
      Defense: 5,
      Wisdom: 8
    },
    description: "Draw one card when played. If a spell was used this turn, draw two instead.",
    tags: ["Draw", "Spellcraft"],
    notes: "Shows how different stats can exist on different cards without forcing a rigid schema.",
    releaseOrder: 2
  },
  {
    slug: "gearbound-scout",
    name: "Gearbound Scout",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    type: "Scout",
    rarity: "Common",
    faction: "Clockwork Run",
    cost: 2,
    stats: {
      Attack: 2,
      Defense: 2,
      Speed: 7
    },
    description: "Reveal the top card of your deck. If it is a machine card, gain +2 speed this round.",
    tags: ["Machine", "Reveal"],
    notes: "Useful example of a small unit card in the archive.",
    releaseOrder: 3
  },
  {
    slug: "petal-warden",
    name: "Petal Warden",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    type: "Guardian",
    rarity: "Epic",
    faction: "Verdant Halo",
    cost: 5,
    stats: {
      Attack: 4,
      Defense: 9,
      Healing: 3
    },
    description: "At the end of your turn, restore allied defense equal to this card's healing stat.",
    tags: ["Heal", "Nature", "Defense"],
    notes: "Demonstrates another custom stat key and a different rarity.",
    releaseOrder: 4
  }
];

const ACG_UPDATES = [
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
