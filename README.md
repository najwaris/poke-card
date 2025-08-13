# PokéDex — Vue 3 + Pinia + Bootstrap 5.3

A small, responsive Pokédex web app built for a coding challenge. It fetches the first **100** Pokémon from the public [PokeAPI](https://pokeapi.co/), supports searching by name, shows a gorgeous card grid, and provides a detail page with editable info stored in **Pinia** (persisted to `localStorage`).

## ✨ Features
- Vue 3 (Composition API) + Vite
- Pinia state management
- Vue Router (hash history for static hosting)
- Bootstrap 5.3 styling & components
- Fetch 100 Pokémon (`?limit=100&offset=0`) respecting fair‑use
- Search by name (substring, case‑insensitive)
- Responsive card grid with artwork, brief info, type badges
- Detail page: artwork, stats, abilities, moves, types
- Edit modal (summary & favorite) — stored in Pinia and persisted
- Loaders/spinners and graceful error handling

## 🧰 Tech
- Vue 3, JavaScript (no TypeScript)
- Pinia
- Vue Router
- Bootstrap 5.3.x

## 🛠️ Local Development
```bash
# 1) Install deps
npm i

# 2) Run dev server
npm run dev

# 3) Open the URL printed by Vite (usually http://localhost:5173)
```

## 🧪 Lint/Format
```bash
npm run format
```

## 🚀 Build & Deploy
```bash
# Build static files to dist/
npm run build

# Preview production build
npm run preview
```

### GitHub Pages
- Commit & push.
- In repo settings → Pages → Build from `dist` via GitHub Actions or use a workflow of your choice.
- If you deploy under a subpath, set env `GH_PAGES_BASE='/<repo-name>/'` at build time or edit `vite.config.js` `base` accordingly.

### Netlify
- New site from Git.
- Build command: `npm run build`
- Publish directory: `dist`

### Render / Static hosts
- Any static host works; upload the `dist` folder.

## 📁 Structure
```
.
├─ src/
│  ├─ assets/styles.css
│  ├─ components/
│  │   ├─ Loader.vue
│  │   ├─ PokemonCard.vue
│  │   └─ SearchBar.vue
│  ├─ stores/pokemon.js
│  ├─ views/
│  │   ├─ Home.vue
│  │   └─ Details.vue
│  ├─ App.vue
│  ├─ main.js
│  └─ router/index.js
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## 🔎 Notes
- Detail prefetching is concurrency‑limited to be nice to the API.
- Edits are stored by Pokémon name in `localStorage` to survive refreshes.
- Router uses hash history for zero‑config static hosting (GitHub Pages friendly).

## ✅ Acceptance Checklist
- [x] Uses Vue 3, JS, Bootstrap 5.3, Pinia
- [x] Fetches 100 Pokémon
- [x] Search by name
- [x] Click → detail page with more info
- [x] Responsive layout
- [x] Loaders while fetching
- [x] Edit info saved into Pinia (persisted)
- [x] README with run instructions

## 📜 License
MIT

# File: .prettierrc
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "trailingComma": "all"
}
