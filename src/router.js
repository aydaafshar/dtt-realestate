import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from './pages/AboutPage.vue'
import HouseDetailPage from './pages/HouseDetailPage.vue'
import HouseListPage from './pages/HouseListPage.vue'
import HouseSavePage from './pages/HouseSavePage.vue'

const routes = [
    { path: '/', component: HouseListPage },
    { path: '/house', component: HouseListPage },
    { path: '/house/:id', component: HouseDetailPage },
    { path: '/house/new', component: HouseSavePage },
    { path: '/house/:id/edit', component: HouseSavePage },
    { path: '/about', component: AboutPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
