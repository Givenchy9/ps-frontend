import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '../views/home/Films.vue';
import Series from '../views/home/Series.vue';
import Latest from '../views/home/Latest.vue';
// import User from '../views/settings/User.vue';
import Endpoint from '../views/settings/Endpoint.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/Films',
          name: 'Films',
          component: Films,
        },
        {
          path: '/Series',
          name: 'Series',
          component: Series,
        },
        {
          path: '/Latest',
          name: 'Latest',
          component: Latest,
        },
      ],
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Favorites.vue')
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Search.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Settings.vue'),
      children: [
        {
          path: '/User',
          name: 'User',
          // component: User,
        },
        {
          path: '/Endpoint',
          name: 'Endpoint',
          component: Endpoint,
        },
      ],
    }
  ]
})

export default router
