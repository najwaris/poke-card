<!-- <template>
    <nav class="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div class="container">
            <RouterLink class="navbar-brand d-flex align-items-center fw-bold" to="/">
                <img src="../assets/pokeball-icon.png" alt="Pokéball" width="30" height="30" class="me-2">
                <span>PokéDex</span>
            </RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">
                            <i class="bi bi-house-door me-1"></i> Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/favorites">
                            <i class="bi bi-heart me-1"></i> Favorites
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://pokeapi.co/" target="_blank">
                            <i class="bi bi-code-slash me-1"></i> API Docs
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
// No script needed for basic navbar
</script>

<style scoped>
.navbar {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border-bottom: 3px solid rgba(255, 204, 0, 0.3);
    padding: 0.75rem 1rem;
}

.navbar-brand {
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    color: white !important;
    transition: all 0.3s ease;
}

.navbar-brand:hover {
    transform: scale(1.02);
}

.nav-link {
    font-weight: 500;
    padding: 0.5rem 1rem !important;
    margin: 0 0.25rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.85) !important;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.15);
    color: white !important;
}

.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.2);
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style> -->


<template>
    <nav class="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div class="container">
            <RouterLink class="navbar-brand d-flex align-items-center fw-bold" to="/">
                <img src="../assets/pokeball-icon.png" alt="Pokéball" width="30" height="30" class="me-2">
                <span>PokéDex</span>
            </RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">
                            <i class="bi bi-house-door me-1"></i> Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/favourites">
                            <i class="bi bi-heart me-1"></i> Favorites
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
// No script needed for basic navbar
</script>

<style scoped>
.navbar {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border-bottom: 3px solid rgba(255, 204, 0, 0.3);
    padding: 0.75rem 1rem;
}

.navbar-brand {
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    color: white !important;
    transition: all 0.3s ease;
}

.navbar-brand:hover {
    transform: scale(1.02);
}

.nav-link {
    font-weight: 500;
    padding: 0.5rem 1rem !important;
    margin: 0 0.25rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.85) !important;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.15);
    color: white !important;
}

.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.2);
}
</style>