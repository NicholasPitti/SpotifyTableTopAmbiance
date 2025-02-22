import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CallbackView from '../views/CallbackView.vue' // Create this component
////import { useAccessTokenStore } from '@/stores/accessToken'
//import { redirectToAuthCodeFlow } from '@/components/spotifyMethods/authorizationMethods'
////import { useClientStore } from '@/stores/clientId'
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
      path: '/compendium',
      name: 'compendium',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CompendiumView.vue')
    },
    {
      path: '/spotify-tool',
      name: 'spotify-tool',
      component: () => import('../views/SpotifyToolView.vue')
    },
  ]
})

/*
router.beforeEach((to,from,next) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  //const store = useUserStore()
  
  //const accessTokenStore = useAccessTokenStore()
  //console.log(accessTokenStore)

})
*/
  /*
  if (!accessTokenStore.storedToken && to.name !== 'Callback') {
    //await redirectToAuthCodeFlow(clientId.storedClientId)
    next({ name: 'callback' })
  } else {
    next()
  }
    */
export default router
