import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeCaregiving from '../views/services/HomeCaregiving.vue'
import EmployeeManagement from '../components/EmployeeManagement.vue'
import AdminLogin from '../views/AdminLogin.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/services/home-caregiving',
      name: 'HomeCaregiving',
      component: HomeCaregiving
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeManagement,
      meta: { requiresAdmin: true }
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

router.beforeEach((to) => {
  const isAuthenticated = sessionStorage.getItem('homemedix_admin_auth') === 'true'

  if (to.meta.requiresAdmin && !isAuthenticated) {
    return { name: 'AdminLogin' }
  }

  if (to.name === 'AdminLogin' && isAuthenticated) {
    return { name: 'employees' }
  }
})

export default router