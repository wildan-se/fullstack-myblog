// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import axios from 'axios'
import Toast from 'vue-toastification' // Impor pustaka utama Toast
import 'vue-toastification/dist/index.css'

// PENTING: Inisialisasi header Authorization untuk Axios dari localStorage
const user = JSON.parse(localStorage.getItem('user'))
if (user && user.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  console.log('main.js: Axios Authorization header set from localStorage.')
} else {
  console.log(
    'main.js: No user token found in localStorage, Authorization header not set initially.',
  )
}

const app = createApp(App)

// --- Pastikan bagian konfigurasi Toast ini ada ---
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

// Daftarkan plugin Toast ke aplikasi Vue. Ini akan meng-inject $toast ke semua komponen.
app.use(Toast, toastOptions)
app.use(store)
app.use(router)

app.mount('#app')

console.log('Vue application mounted.')
