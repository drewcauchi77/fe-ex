import { mount } from 'cypress/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from '../../src/router'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '../../src/assets/global.scss'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      app.use(
        createRouter({
          routes: routes,
          history: createMemoryHistory()
        })
      )
      app.use(createPinia())
    }
  })

  return mount(component, options)
})
