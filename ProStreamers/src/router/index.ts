import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '../views/home/Films.vue'

import Series from '../views/home/Series.vue'
import Details from '../views/Details.vue'

import Latest from '../views/home/Latest.vue'
// import User from '../views/settings/User.vue';
import Endpoint from '../views/settings/Endpoint.vue'

const routes = [
  {
    path: '/',
    redirect: '/films' // redirect to films
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'films',
        name: 'films',
        component: Films
      },
      {
        path: 'series',
        name: 'series',
        component: Series
      },
      {
        path: 'latest',
        name: 'latest',
        component: Latest
      },
      {
        path: 'details/:filmId',
        name: 'details',
        component: Details,
        props: true
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/Search.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('../views/Favorites.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/Settings.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '/user',
            name: 'user',
            component: () => import('../views/settings/Account.vue')
          },
          {
            path: '/endpoint',
            name: 'endpoint',
            component: () => import('../views/settings/Endpoint.vue')
          }
        ]
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: { hideFooter: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
    meta: { hideFooter: true }
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/film' // Redirect any unknown paths to the home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const time = localStorage.getItem('tokenTime')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const loginDate = new Date(time)
    const now = new Date()
    const differenceInHours = (now - loginDate) / (1000 * 60 * 60)
    if (!token || !user || differenceInHours > 0.5 || !time) {
      localStorage.clear()
      next({
        path: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
