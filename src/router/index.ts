import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue' // Create this component

//Modifiactions to the index.ts forces a redirectAuth flow to trigger

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallbackView
    },
    {
      path: '/duplicate',
      name: 'duplicate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DuplicateView.vue')
    },
    {
      path: '/allplaylist',
      name: 'allplaylist',
      component: () => import('../views/AllPlaylistView.vue')
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('../views/LikesView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/sort',
      name: 'sort',
      component: () => import('../views/SortTracksView.vue')
    },
  ]
})

export default router
