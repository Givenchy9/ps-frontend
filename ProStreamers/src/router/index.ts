import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '../views/home/Films.vue';
import Series from '../views/home/Series.vue';
import Latest from '../views/home/Latest.vue';
// import User from '../views/settings/User.vue';
import Endpoint from '../views/settings/Endpoint.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'films',
        name: 'films',
        component: Films,
      },
      {
        path: 'series',
        name: 'series',
        component: Series,
      },
      {
        path: 'latest',
        name: 'latest',
        component: Latest,
      },
    ],
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/Favorites.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'user',
        name: 'user',
        // Uncomment and use the correct component when needed
        // component: User,
      },
      {
        path: 'endpoint',
        name: 'endpoint',
        component: Endpoint,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Redirect any unknown paths to the home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
