import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue' //root component
import router from './router'

const app = createApp(App)
/*
const app = createApp({
  // root component options
})
*/
app.use(createPinia())
app.use(router)

//mount should always be called after all app configurations and asset registrations are done.
//its return value, unlike the asset registration methods, is the root component instance instead of the application instance.
app.mount('#app')

//mounting onto selector
/*
The content of the app's root component will be rendered inside the container element. 

index.html?

The container element itself is not considered part of the app.
 */