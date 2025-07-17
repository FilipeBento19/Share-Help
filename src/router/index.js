// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
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
  history: createWebHistory(),
  routes
});

export default router;