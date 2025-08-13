<template>
    <footer class="bg-dark text-white py-5 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4 mb-md-0">
                    <h5 class="text-warning mb-3">PokéDex</h5>
                    <p class="text-muted">The ultimate Pokémon encyclopedia featuring the first 100 Pokémon from the
                        classic series.</p>
                </div>
                <div class="col-md-2 mb-4 mb-md-0">
                    <h5 class="text-warning mb-3">Explore</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><router-link to="/" class="text-white text-decoration-none">Home</router-link>
                        </li>
                        <li class="mb-2"><router-link to="/favourites"
                                class="text-white text-decoration-none">Favorites</router-link></li>
                    </ul>
                </div>
                <div class="col-md-2 mb-4 mb-md-0">
                    <h5 class="text-warning mb-3">Resources</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="https://pokeapi.co/" class="text-white text-decoration-none"
                                target="_blank">PokeAPI</a></li>
                        <li class="mb-2"><a href="https://pokemon.com" class="text-white text-decoration-none"
                                target="_blank">Official Site</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5 class="text-warning mb-3">Connect</h5>
                    <div class="d-flex gap-3 mb-3">
                        <a href="https://www.linkedin.com/in/nurul-najwa-mat-aris" class="text-white"><i class="bi bi-linkedin"></i></a>
                        <a href="https://github.com/najwaris" class="text-white"><i class="bi bi-github"></i></a>
                    </div>
                    <p class="small mb-0">© 2023 PokéDex | Najwa. Not affiliated with Nintendo.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// No script needed for basic footer
</script>

<style scoped>
footer {
    background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%);
    border-top: 3px solid rgba(220, 53, 69, 0.3);
}

a {
    transition: color 0.2s ease;
}

a:hover {
    color: var(--bs-warning) !important;
}

.bi {
    font-size: 1.5rem;
}
</style>