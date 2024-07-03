// Importing dependencies and views
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Films from '../views/home/Films.vue'
import Series from '../views/home/Series.vue'
import Details from '../views/Details.vue'
import axios from 'axios'
import Latest from '../views/home/Latest.vue'

// defining routes
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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { hideFooter: true }
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
    redirect: '/films'
  }
]

// init router and give the routers
const router = createRouter({
  history: createWebHistory(),
  routes
})

// before every route run this code
router.beforeEach(async (to, from, next) => {
  // get from localstorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const time = localStorage.getItem('tokenTime')

  if (to.path === '/login' || to.path === '/register') {
    return next()
  }

  // if user or time are not defined, return to /login
  if (!user || !time) {
    return next('/login')
  }
  // get user information
  let userJSON = JSON.parse(user)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // check if user email is admin when routing to dashboard
    if (to.name == 'dashboard') {
      if (userJSON.email == 'admin@gmail.com') {
        console.log('IS ADMIN')
      } else {
        return next('/films')
      }
    }

    // if one of these is undefined in localstorage, clear localstorage and return to login
    if (!token || !user || !time) {
      localStorage.clear()
      return next({ path: '/login' })
    }

    // calculate time since API key was fetched
    const loginDate = new Date(time).getTime()
    const now = new Date().getTime()
    const differenceInHours = (now - loginDate) / (1000 * 60 * 60)

    // if token is older than 0.1hrs > refetch API token
    if (differenceInHours > 0.1) {
      try {
        const response = await axios.get('https://www.chrisouboter.com/api/user/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // if response was success, reset tokenTime in localstorage
        if (response.data.success) {
          localStorage.setItem('tokenTime', new Date().toISOString())
          return next()
        } else {
          localStorage.clear()
          return next('/login')
        }
      } catch (error) {
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
