import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard_view.vue'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/projects',
    children: [
      {
        path: '',
        name: 'Projects',
        component: () => import('../views/project/projects_view.vue'),
        meta: {
          title: 'Projects'
        }
      },
      {
        path: 'create',
        name: 'CreateProject',
        component: () => import('../views/project/create_view.vue'),
        meta: {
          title: 'Create Project'
        }
      },
      {
        path: ':id',
        name: 'SingleProject',
        component: () => import('../views/project/single_view.vue'),
        meta: {
          title: 'Project'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error_view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
