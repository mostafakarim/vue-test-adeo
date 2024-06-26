import { createApp } from 'vue'
import './style.css'
import 'v-calendar/style.css'
import VCalendar from 'v-calendar'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VCalendar, {})
app.mount('#app')
