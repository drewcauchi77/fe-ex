import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard_view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/projects',
      children: [
        {
          path: '',
          name: 'Projects',
          component: () => import('../views/project/projects_view.vue')
        },
        {
          path: 'create',
          name: 'CreateProject',
          component: () => import('../views/project/create_view.vue')
        },
        {
          path: ':id',
          name: 'SingleProject',
          component: () => import('../views/project/single_view.vue')
        }
      ]
    }
  ]
})

export default router
