// 1. Importasi Fungsi Inti Vuex
import { createStore } from 'vuex' // Mengimpor fungsi `createStore` dari pustaka Vuex, yang digunakan untuk membuat instance store.

// 2. Importasi Modul-Modul Vuex
// Ini adalah modul-modul Vuex terpisah yang telah Anda buat untuk mengelola bagian-bagian state yang berbeda.
// Pendekatan modular ini membantu menjaga store tetap terorganisir dan mudah dikelola, terutama untuk aplikasi yang besar.
import auth from './modules/auth' // Mengimpor modul 'auth' yang menangani state dan logika otentikasi.
import posts from './modules/posts' // Mengimpor modul 'posts' yang menangani state dan logika postingan blog.
import categories from './modules/categories' // Mengimpor modul 'categories' yang menangani state dan logika kategori.
import comments from './modules/comments' // Mengimpor modul 'comments' yang menangani state dan logika komentar.

// 3. Membuat dan Mengekspor Vuex Store
// Menggunakan `createStore` untuk membuat instance store Vuex.
export default createStore({
  // Objek 'modules' adalah tempat di mana Anda mendaftarkan semua modul Vuex Anda.
  // Setiap kunci di objek ini (misal: 'auth', 'posts') akan menjadi namespace untuk modul tersebut.
  // Ini berarti Anda dapat mengakses state, getters, mutations, dan actions dari modul tersebut
  // dengan awalan namespace (misal: store.getters['auth/isAuthenticated'], store.dispatch('posts/fetchPosts')).
  modules: {
    auth, // Modul otentikasi
    posts, // Modul postingan
    categories, // Modul kategori
    comments, // Modul komentar
  },
  // Anda juga bisa mendefinisikan state, getters, mutations, dan actions langsung di root store di sini,
  // tetapi untuk aplikasi yang lebih besar, memecahnya ke dalam modul adalah praktik terbaik.
  // Contoh:
  // state: {
  //   rootMessage: 'Hello from root store!'
  // },
  // getters: {
  //   getRootMessage: state => state.rootMessage
  // },
  // mutations: {
  //   SET_ROOT_MESSAGE(state, message) {
  //     state.rootMessage = message
  //   }
  // },
  // actions: {
  //   updateRootMessage({ commit }, message) {
  //     commit('SET_ROOT_MESSAGE', message)
  //   }
  // }
})
