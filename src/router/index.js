import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeVue.vue';
import About from '@/views/AboutVue.vue';
import Manage from '@/views/ManageVue.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/manage', component: Manage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
