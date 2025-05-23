import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('../views/ReservationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import('../views/LocationView.vue')
  },
  {
    path: '/myinfo',
    name: 'MyInfo',
    component: () => import('../views/MyInfoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/ServiceView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router 