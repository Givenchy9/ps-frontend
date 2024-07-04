import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '../views/home/Films.vue'

import Series from '../views/home/Series.vue'
import Details from '../views/Details.vue'
import axios from 'axios'
import Latest from '../views/home/Latest.vue'

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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
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
    redirect: '/film'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// before each router redirect
router.beforeEach(async (to, from, next) => {
  // get information from localstorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const time = localStorage.getItem('tokenTime')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // redirect non-adminds to home

    if (!token || !user || !time) {
      localStorage.clear()
      return next({ path: '/login' })
    }
    if (to.name == 'dashboard') {
      let userJSON = JSON.parse(user)
      if (!(userJSON.email == 'admin@gmail.com')) {
        return next('/films')
      }
    }
    // check time since token created
    const loginDate = new Date(time)
    const now = new Date()
    const differenceInHours = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

    // if token is older than 0.1 hours, check token in database
    if (differenceInHours > 0.1) {
      try {
        const response = await axios.get('http://www.chrisouboter.com/api/user/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // handle refetch of token
        if (response.data.success) {
          console.log('API key still available')
          localStorage.setItem('tokenTime', new Date().toISOString())
          return next()
        } else {
          console.log('API key not valid, clearing session')
          localStorage.clear()
          return next('/login')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        localStorage.clear()
        return next('/login')
      }
    }

    return next()
  } else {
    return next()
  }
})

export default router
