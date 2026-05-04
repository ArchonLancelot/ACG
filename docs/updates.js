const updatesList = document.getElementById("updates-list");

[...ACG_UPDATES]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .forEach((update) => {
    const article = document.createElement("article");
    article.className = "timeline-card";

    const items = update.changes.map((change) => `<li>${change}</li>`).join("");

    article.innerHTML = `
      <div class="timeline-meta">
        <span>${update.date}</span>
        <strong>${update.version}</strong>
      </div>
      <h2>${update.title}</h2>
      <p>${update.summary}</p>
      <ul class="update-list">${items}</ul>
    `;

    updatesList.appendChild(article);
  });
