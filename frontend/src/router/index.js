// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../views/LoginPage.vue'
import InstitutionPage from '../views/InstitutionPage.vue'
import AbrigoPage from '../views/AbrigoPage.vue'
import CriancaPage from '../views/CriancaPage.vue'
import IdososPage from '../views/IdososPage.vue'
import OngPage from '../views/OngPage.vue'
import PerfilPage from '../views/PerfilPage.vue'
import MapInterativePage from '../views/MapInterative.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: PerfilPage,
  },
  {
    path: '/mapinterative',
    name: 'Map',
    component: MapInterativePage,
  },
  {
    path: '/institution',
    name: 'Instituição',
    component: InstitutionPage,
  },
  {
    path: '/abrigo',
    name: 'Abrigo',
    component: AbrigoPage,
  },
  {
    path: '/idosos',
    name: 'Idosos',
    component: IdososPage,
  },
  {
    path: '/criancas',
    name: 'Crianças',
    component: CriancaPage,
  },
  {
    path: '/abrigo/:id',
    name: 'Abrigo/OngPage',
    component: OngPage,
  },
  {
    path: '/criancas/:id',
    name: 'Criancas/OngPage',
    component: OngPage,
  },
  {
    path: '/idosos/:id',
    name: 'Idosos/OngPage',
    component: OngPage,
  },
  {
    path: '/institution/:id',
    name: 'Institution/OngPage',
    component: OngPage,
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
]

function smoothScrollToTop(duration = 200) {
  const start = window.scrollY
  const startTime = performance.now()

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)

    window.scrollTo(0, start * (1 - ease))

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      smoothScrollToTop(500) // 500 = 0.5s
      return { left: 0, top: 0 }
    }
  },
})

export default router
