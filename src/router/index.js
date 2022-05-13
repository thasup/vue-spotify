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
    beforeEnter: (to, from, next) => {
      console.log('ggg');
      next();
    },
  },
  { path: '/manage', redirect: { name: 'manage' } },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-600',
});

router.beforeEach((to, from, next) => {
  console.log('kllkkk');
  next();
});

export default router;
