# ACG V0.03

ACG is a flexible card wiki website for a custom card game.

The public-ready static website lives in the `docs` folder. That folder is designed for GitHub Pages so the site can keep the same URL through future updates.

## GitHub Pages Setup

To make the site public:

1. Open this repository on GitHub.
2. Go to `Settings > Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select branch `main` and folder `/docs`.
5. Save.

Once GitHub finishes publishing, the stable site URL should be:

`https://archonlancelot.github.io/ASI/`

Future updates should be pushed to this same repository so the link stays the same.

## Main Site Files

- `docs/index.html` is the card archive.
- `docs/card.html` is the card detail page.
- `docs/updates.html` is the update log.
- `docs/data.js` stores card and update data for the static site.
