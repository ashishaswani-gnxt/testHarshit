import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
import router from './router'
// Use Pinia store
app.use(createPinia())
app.use(router)
app.mount('#app')
