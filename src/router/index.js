// src/router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
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
  // Usar Web History em desenvolvimento, Hash History em produção se não tiver vercel.json
  history: process.env.NODE_ENV === 'production' 
    ? createWebHistory() // Tente primeiro com Web History
    : createWebHistory(),
  routes
});

// Tratamento de erro para rotas não encontradas
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;