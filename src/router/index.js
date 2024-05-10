import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import vista_ciudad from '../views/vista_ciudad.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: vista_ciudad,
      mata: {
        title: 'Clima',
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state
    ? `${to.params.city}, ${to.params.state}`
    : to.meta.title
    } | Clima`;
  next();
});
export default router
