import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/pokemon/:name', name: 'details', component: Details, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    history: createWebHashHistory(), // hash for easy static hosting
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;