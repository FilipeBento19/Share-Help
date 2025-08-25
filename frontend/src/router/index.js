// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Login from '../views/LoginPage.vue';
import InstitutionPage from '../views/InstitutionPage.vue';
import AbrigoPage from '../views/AbrigoPage.vue';

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
    path: '/institution',
    name: 'Instituição',
    component: InstitutionPage
  },
  { 
    path: '/abrigo',
    name: 'Abrigo',
    component: AbrigoPage
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
  routes
})

export default router;