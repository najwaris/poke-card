<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <RouterLink class="navbar-brand fw-bold" to="/">PokéDex</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample"
          aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarsExample" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="https://pokeapi.co/" target="_blank" rel="noreferrer">API</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Transition Wrapper -->
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>

    <!-- Footer -->
    <footer class="py-4 mt-5 border-top bg-light">
      <div class="container text-center small text-muted">
        Built with Vue 3 · Pinia · Bootstrap 5.3 · PokeAPI
      </div>
    </footer>
  </div>
</template>

<script setup>
// keeping lean
</script>

<style scoped>
.navbar-brand {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
