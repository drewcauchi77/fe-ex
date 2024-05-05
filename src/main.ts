import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'

import App from './App.vue'
import router from './router'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(
  createPinia().use(({ store }) => {
    store.$debug = true
  })
)
app.use(router)
app.use(Quasar, {
  plugins: {
    Notify
  }
})

app.mount('#app')
