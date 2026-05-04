function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createImageFallback(label) {
  const safeLabel = String(label)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#142743" />
          <stop offset="100%" stop-color="#0b1324" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#g)" />
      <text x="50%" y="47%" fill="#5fd1ff" font-size="54" font-family="Arial, sans-serif" text-anchor="middle">ACG</text>
      <text x="50%" y="54%" fill="#edf5ff" font-size="30" font-family="Arial, sans-serif" text-anchor="middle">${safeLabel}</text>
      <text x="50%" y="61%" fill="#9ab0cb" font-size="22" font-family="Arial, sans-serif" text-anchor="middle">Image coming soon</text>
    </svg>`
  )}`;
}

function getUrlState() {
  const params = new URLSearchParams(window.location.search);

  return {
    search: params.get("search") || "",
    type: params.get("type") || "All",
    rarity: params.get("rarity") || "All",
    sort: params.get("sort") || "newest"
  };
}

function updateUrlState(state) {
  const params = new URLSearchParams();

  if (state.search) {
    params.set("search", state.search);
  }

  if (state.type && state.type !== "All") {
    params.set("type", state.type);
  }

  if (state.rarity && state.rarity !== "All") {
    params.set("rarity", state.rarity);
  }

  if (state.sort && state.sort !== "newest") {
    params.set("sort", state.sort);
  }

  const nextUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

function fillSelect(select, items) {
  select.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";
  select.appendChild(allOption);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

function createStatChip(value, label) {
  const chip = document.createElement("article");
  chip.className = "stat-chip";
  chip.innerHTML = `<span>${value}</span><p>${label}</p>`;
  return chip;
}

function renderHeroStats(cards) {
  const heroStats = document.getElementById("hero-stats");
  const types = uniqueSorted(cards.map((card) => card.type));
  const rarities = uniqueSorted(cards.map((card) => card.rarity));

  heroStats.append(
    createStatChip(cards.length, "Cards Loaded"),
    createStatChip(types.length, "Types Tracked"),
    createStatChip(rarities.length, "Rarities Tracked")
  );
}

function renderCards(cards) {
  const grid = document.getElementById("card-grid");
  const count = document.getElementById("results-count");

  grid.innerHTML = "";
  count.textContent = `${cards.length} cards shown`;

  if (!cards.length) {
    const empty = document.createElement("article");
    empty.className = "empty-state";
    empty.innerHTML = "<h2>No cards found</h2><p>Try a different search or filter.</p>";
    grid.appendChild(empty);
    return;
  }

  cards.forEach((card) => {
    const tile = document.createElement("a");
    tile.className = "card-tile";
    tile.href = `card.html?slug=${encodeURIComponent(card.slug)}`;

    const safeName = escapeHtml(card.name);
    const safeRarity = escapeHtml(card.rarity);
    const safeType = escapeHtml(card.type);
    const safeDescription = escapeHtml(card.description);
    const miniStats = Object.entries(card.stats)
      .slice(0, 3)
      .map(([label, value]) => `<span>${escapeHtml(label)}: ${escapeHtml(value)}</span>`)
      .join("");

    tile.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-image" src="${card.image}" alt="${safeName}">
      </div>
      <div class="card-copy">
        <div class="card-line">
          <h2>${safeName}</h2>
          <span>${safeRarity}</span>
        </div>
        <p class="card-type">${safeType}</p>
        <p class="card-description">${safeDescription}</p>
        <div class="mini-stats">${miniStats}</div>
      </div>
    `;

    const image = tile.querySelector("img");
    image.addEventListener("error", () => {
      image.src = createImageFallback(card.name);
    }, { once: true });

    grid.appendChild(tile);
  });
}

function sortCards(cards, sortBy) {
  const sorted = [...cards];

  sorted.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "rarity") {
      return a.rarity.localeCompare(b.rarity);
    }

    if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }

    return b.releaseOrder - a.releaseOrder;
  });

  return sorted;
}

function setupArchive() {
  const searchInput = document.getElementById("search-input");
  const typeFilter = document.getElementById("type-filter");
  const rarityFilter = document.getElementById("rarity-filter");
  const sortFilter = document.getElementById("sort-filter");
  const state = getUrlState();
  const types = uniqueSorted(ACG_CARDS.map((card) => card.type));
  const rarities = uniqueSorted(ACG_CARDS.map((card) => card.rarity));

  fillSelect(typeFilter, types);
  fillSelect(rarityFilter, rarities);
  renderHeroStats(ACG_CARDS);

  searchInput.value = state.search;
  typeFilter.value = types.includes(state.type) ? state.type : "All";
  rarityFilter.value = rarities.includes(state.rarity) ? state.rarity : "All";
  sortFilter.value = ["newest", "name", "rarity", "type"].includes(state.sort)
    ? state.sort
    : "newest";

  function updateView() {
    const searchText = searchInput.value.trim().toLowerCase();
    const nextState = {
      search: searchInput.value.trim(),
      type: typeFilter.value,
      rarity: rarityFilter.value,
      sort: sortFilter.value
    };

    const filtered = ACG_CARDS.filter((card) => {
      const matchesSearch = card.name.toLowerCase().includes(searchText);
      const matchesType = typeFilter.value === "All" || card.type === typeFilter.value;
      const matchesRarity = rarityFilter.value === "All" || card.rarity === rarityFilter.value;

      return matchesSearch && matchesType && matchesRarity;
    });

    updateUrlState(nextState);
    renderCards(sortCards(filtered, sortFilter.value));
  }

  searchInput.addEventListener("input", updateView);
  typeFilter.addEventListener("change", updateView);
  rarityFilter.addEventListener("change", updateView);
  sortFilter.addEventListener("change", updateView);

  updateView();
}

setupArchive();
