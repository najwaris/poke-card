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
- Bootstrap 
