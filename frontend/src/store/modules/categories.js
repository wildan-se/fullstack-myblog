// 1. Importasi Pustaka
import axios from 'axios' // Mengimpor Axios untuk melakukan permintaan HTTP ke API backend.

// 2. Konfigurasi URL API
const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/categories/` // Mendefinisikan base URL untuk endpoint kategori di backend.
// PENTING: Saat deploy, ini harus diubah ke URL backend yang sebenarnya.

// 3. Definisi State
const state = {
  categories: [], // Array untuk menyimpan daftar kategori yang diambil dari API.
  loading: false, // Boolean untuk menunjukkan apakah operasi API sedang berlangsung (misal: fetching, creating, updating, deleting).
  error: null, // Akan menyimpan pesan kesalahan jika terjadi masalah pada operasi kategori.
}

// 4. Getters
// Getters adalah cara untuk mengambil data dari state store, dan bisa melakukan komputasi pada data tersebut.
const getters = {
  allCategories: (state) => state.categories, // Mengembalikan seluruh daftar kategori.
  categoriesLoading: (state) => state.loading, // Mengembalikan status loading saat ini.
  categoriesError: (state) => state.error, // Mengembalikan pesan kesalahan kategori.
}

// 5. Mutations
// Mutations adalah satu-satunya cara untuk mengubah state di Vuex. Mereka harus sinkron.
const mutations = {
  categories_request(state) {
    state.loading = true // Mengatur status loading menjadi true saat permintaan API dimulai.
    state.error = null // Menghapus pesan kesalahan sebelumnya.
  },
  set_categories(state, categories) {
    state.categories = categories // Menyimpan daftar kategori yang diterima ke state.
    state.loading = false // Mengatur status loading menjadi false setelah data diterima.
  },
  categories_error(state, error) {
    state.loading = false // Mengatur status loading menjadi false saat terjadi kesalahan.
    state.error = error // Menyimpan pesan kesalahan yang diterima.
  },
  add_category(state, category) {
    state.categories.push(category) // Menambahkan kategori baru ke array 'categories'.
    state.loading = false // Mengatur status loading menjadi false.
  },
  // Mutasi untuk memperbarui kategori di dalam daftar
  update_category(state, updatedCategory) {
    // Mencari indeks kategori yang akan diperbarui berdasarkan _id.
    const index = state.categories.findIndex((cat) => cat._id === updatedCategory._id)
    if (index !== -1) {
      // Jika kategori ditemukan, ganti objek lama dengan objek yang diperbarui.
      state.categories.splice(index, 1, updatedCategory)
    }
    state.loading = false // Mengatur status loading menjadi false.
  },
  // Mutasi untuk menghapus kategori dari daftar
  delete_category(state, categoryId) {
    // Memfilter array 'categories' untuk menghapus kategori dengan 'categoryId' yang cocok.
    state.categories = state.categories.filter((cat) => cat._id !== categoryId)
    state.loading = false // Mengatur status loading menjadi false.
  },
  // Mutasi untuk bulk delete categories
  bulk_delete_categories(state, categoryIds) {
    state.categories = state.categories.filter((cat) => !categoryIds.includes(cat._id))
    state.loading = false
  },
}

// 6. Actions
// Actions adalah tempat di mana Anda melakukan operasi asinkron (seperti panggilan API) dan kemudian
// memanggil mutations untuk mengubah state.
const actions = {
  // Aksi untuk mengambil semua kategori
  async fetchCategories({ commit }) {
    commit('categories_request') // Mengatur status 'loading'.
    try {
      const response = await axios.get(API_URL) // Mengirim permintaan GET ke API kategori.
      commit('set_categories', response.data) // Memanggil mutasi untuk menyimpan kategori yang diterima.
    } catch (error) {
      // Menangani kesalahan: mengambil pesan kesalahan dari respons API atau menggunakan pesan default.
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('categories_error', errorMessage) // Memanggil mutasi untuk mengatur status 'error'.
    }
  },

  // Aksi untuk membuat kategori baru
  async createCategory({ commit }, categoryName) {
    commit('categories_request') // Mengatur status 'loading'.
    try {
      // Mengambil token pengguna dari localStorage untuk otentikasi.
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      }
      // Mengirim permintaan POST ke API kategori dengan nama kategori baru.
      const response = await axios.post(API_URL, { name: categoryName }, config)
      commit('add_category', response.data) // Memanggil mutasi untuk menambahkan kategori baru ke state.
      return Promise.resolve(response.data) // Mengembalikan Promise yang berhasil dengan data kategori.
    } catch (error) {
      // Menangani kesalahan pembuatan kategori.
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('categories_error', errorMessage) // Mengatur status 'error'.
      return Promise.reject(errorMessage) // Mengembalikan Promise yang gagal.
    }
  },

  // Aksi untuk memperbarui kategori yang sudah ada
  async updateCategory({ commit }, { id, name }) {
    commit('categories_request') // Mengatur status 'loading'.
    try {
      // Mengambil token pengguna untuk otentikasi.
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      }
      // Mengirim permintaan PUT ke API kategori dengan ID kategori dan nama yang diperbarui.
      const response = await axios.put(`${API_URL}${id}`, { name }, config)
      commit('update_category', response.data) // Memanggil mutasi untuk memperbarui kategori di state.
      return Promise.resolve(response.data) // Mengembalikan Promise yang berhasil.
    } catch (error) {
      // Menangani kesalahan pembaruan kategori.
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('categories_error', errorMessage) // Mengatur status 'error'.
      return Promise.reject(errorMessage) // Mengembalikan Promise yang gagal.
    }
  },

  // Aksi untuk menghapus kategori
  async deleteCategory({ commit }, id) {
    commit('categories_request') // Mengatur status 'loading'.
    try {
      // Mengambil token pengguna untuk otentikasi.
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = { headers: { Authorization: `Bearer ${userToken}` } }
      // Mengirim permintaan DELETE ke API kategori dengan ID kategori.
      await axios.delete(`${API_URL}${id}`, config)
      commit('delete_category', id) // Memanggil mutasi untuk menghapus kategori dari state.
      return Promise.resolve('Kategori berhasil dihapus.') // Mengembalikan Promise yang berhasil.
    } catch (error) {
      // Menangani kesalahan penghapusan kategori.
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('categories_error', errorMessage) // Mengatur status 'error'.
      return Promise.reject(errorMessage) // Mengembalikan Promise yang gagal.
    }
  },

  // Aksi untuk bulk delete categories
  async bulkDeleteCategories({ commit }, categoryIds) {
    commit('categories_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      }
      const response = await axios.post(`${API_URL}bulk-delete`, { categoryIds }, config)
      commit('bulk_delete_categories', categoryIds)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('categories_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
}

// 7. Ekspor Modul Vuex
// Mendefinisikan modul ini sebagai modul dengan namespace, yang berarti Anda akan mengaksesnya
// melalui 'categories/' (misal: store.getters['categories/allCategories']).
export default { namespaced: true, state, getters, mutations, actions }
