// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
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
  // Usar Hash History - funciona sempre no Vercel
  history: createWebHashHistory(),
  routes
});

// Tratamento de erro para rotas não encontradas
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;