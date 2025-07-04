import { setupLayouts } from 'virtual:generated-layouts'
import { createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { createRouter } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

// 添加路由守卫
import { createRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

// 导出之前使用路由守卫
createRouterGuard(router)

export default router

if (import.meta.hot) {
  handleHotUpdate(router)
}