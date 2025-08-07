// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  { 
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
  // {
  //   path: '/institutions',
  //   name: 'Institutions',
  //   component: InstitutionsPage
  // },
  // {
  //   path: '/map',
  //   name: 'Map',
  //   component: MapPage
  // },
  // {
  //   path: '/team',
  //   name: 'Team',
  //   component: TeamPage
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

// Tratamento de erro para rotas não encontradas
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;