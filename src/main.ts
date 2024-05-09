import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'

import App from './App.vue'
import router from './router'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './assets/global.scss'

const app = createApp(App)

// Global property read by Pinia to show console logs for ease of setter tracking
app.config.globalProperties.$debugPinia = true
// Global property read by Pinia and in App.vue so we can decide whether to use the local storage or not
// Local storage is good usage across multiple browser tabs but might go out of space easily
app.config.globalProperties.$useLocalStorage = true
app.provide('$useLocalStorage', app.config.globalProperties.$useLocalStorage)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {
    Notify
  }
})

app.mount('#app')
