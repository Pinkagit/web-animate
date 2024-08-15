import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/svg',
      name: 'svg',
      component: () => import('../views/SvgView.vue')
    },
    {
      path: '/spine',
      name: 'spine',
      component: () => import('../views/SpineView.vue')
    },
    {
      path: '/sprite',
      name: 'sprite',
      component: () => import('../views/SpriteView.vue')
    },
    {
      path: '/tween',
      name: 'tween',
      component: () => import('../views/TweenView.vue')
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('../views/CanvasView.vue')
    }
  ]
})

export default router
