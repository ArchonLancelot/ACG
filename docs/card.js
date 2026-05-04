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

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const card = ACG_CARDS.find((entry) => entry.slug === slug);
const detail = document.getElementById("card-detail");

if (!card) {
  detail.innerHTML = `
    <div class="content-panel">
      <p class="eyebrow">Missing Card</p>
      <h1>This card does not exist yet.</h1>
      <a class="back-link" href="index.html">Return to archive</a>
    </div>
  `;
} else {
  document.title = `${card.name} | ACG V0.03`;

  const tags = (card.tags || [])
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
  const stats = Object.entries(card.stats)
    .map(([label, value]) => `<article class="stat-card"><p>${escapeHtml(label)}</p><strong>${escapeHtml(value)}</strong></article>`)
    .join("");

  detail.innerHTML = `
    <div class="card-art-panel">
      <img class="card-art-large" src="${card.image}" alt="${escapeHtml(card.name)}">
    </div>

    <div class="content-panel">
      <p class="eyebrow">${escapeHtml(card.rarity)}</p>
      <h1>${escapeHtml(card.name)}</h1>

      <div class="tag-row">
        <span class="tag">Type: ${escapeHtml(card.type)}</span>
        ${card.faction ? `<span class="tag">Faction: ${escapeHtml(card.faction)}</span>` : ""}
        ${card.cost ? `<span class="tag">Cost: ${escapeHtml(card.cost)}</span>` : ""}
      </div>

      <p class="description-copy">${escapeHtml(card.description)}</p>

      <section class="detail-section">
        <h2>Stats</h2>
        <div class="stats-grid">${stats}</div>
      </section>

      ${tags ? `<section class="detail-section"><h2>Keywords</h2><div class="tag-row">${tags}</div></section>` : ""}
      ${card.notes ? `<section class="detail-section"><h2>Design Notes</h2><p class="description-copy">${escapeHtml(card.notes)}</p></section>` : ""}

      <a class="back-link" href="index.html">Back to archive</a>
    </div>
  `;

  const image = detail.querySelector(".card-art-large");
  image.addEventListener("error", () => {
    image.src = createImageFallback(card.name);
  }, { once: true });
}
