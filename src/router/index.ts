import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'weekly',
    component: () => import('../views/WeeklyView.vue')
  },
  {
    path: '/weekly',
    redirect: '/'
  },
  {
    path: '/raha',
    name: 'raha',
    component: () => import('../views/RahaView.vue')
  },
  {
    path: '/today',
    name: 'today',
    component: () => import('../views/TodayView.vue')
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: () => import('../views/AttendanceView.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CoursesView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
