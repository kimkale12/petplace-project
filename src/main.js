import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'


import './assets/css/auth.css'
import './assets/css/styles.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')