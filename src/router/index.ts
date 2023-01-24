import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PictureOfTheDayView from '../views/PictureOfTheDayView.vue'
import EarthView from '../views/EarthView.vue'
import EpicView from '../views/EpicView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/poad',
      name: 'poad',
      component: PictureOfTheDayView
    },
    {
      path: '/earth',
      name: 'earth',
      component: EarthView
    },
    {
      path: '/epic',
      name: 'epic',
      component: EpicView
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requiresAuth: true
      },
      component: Profile
    },
  ]
})


export default router
