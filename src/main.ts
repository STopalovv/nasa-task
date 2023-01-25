import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from './store'
// import { createProxyMiddleware } from 'http-proxy-middleware'

const app = createApp(App)

// const proxy = createProxyMiddleware({
//     target: 'https://api.nasa.gov',
//     changeOrigin: true
// })

app.use(router)
app.use(store)

app.mount('#app')
