import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeVue.vue';
import About from '@/views/AboutVue.vue';
import Manage from '@/views/ManageVue.vue';

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'about', path: '/about', component: About },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: Manage,
  },
  { path: '/manage', redirect: { name: 'manage' } },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-600',
});

export default router;
