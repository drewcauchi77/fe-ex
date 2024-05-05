import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'
import Dashboard from '../views/dashboard_view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/projects',
      children: [
        {
          path: '',
          name: 'projects',
          component: () => import('../views/project/projects_view.vue')
        },
        {
          path: 'create',
          name: 'projects-create',
          component: () => import('../views/project/create_view.vue')
        }
      ]
    }
  ]
})

export default router
