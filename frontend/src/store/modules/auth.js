import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/`

// Initial state, check localStorage for existing user
const user = JSON.parse(localStorage.getItem('user'))

const state = {
  user: user || null,
  status: user ? 'loggedIn' : 'loggedOut',
  error: null, // Add error state
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  isAdmin: (state) => state.user && state.user.role === 'admin',
  currentUser: (state) => state.user,
  authStatus: (state) => state.status, // Expose status for UI feedback
  authError: (state) => state.error, // Expose error for UI feedback
}

const mutations = {
  auth_request(state) {
    console.log('Mutation: auth_request')
    state.status = 'loading'
    state.error = null // Clear previous errors
  },
  auth_success(state, user) {
    console.log('Mutation: auth_success', user)
    state.status = 'loggedIn'
    state.user = user
    state.error = null
  },
  auth_error(state, error) {
    // Accept error message
    console.error('Mutation: auth_error', error)
    state.status = 'error'
    state.user = null
    state.error = error
  },
  logout(state) {
    console.log('Mutation: logout - Resetting state')
    state.status = 'loggedOut'
    state.user = null // Set user to null
    state.error = null
  },
}

const actions = {
  async login({ commit }, userCredentials) {
    commit('auth_request') // Set status to loading
    try {
      const response = await axios.post(API_URL + 'login', {
        email: userCredentials.email,
        password: userCredentials.password,
      })
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      commit('auth_success', userData)
      console.log('Action: login successful')
      return Promise.resolve(userData)
    } catch (error) {
      console.error('Action: login failed', error.response || error)
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Gagal login. Mohon periksa kredensial Anda.'
      commit('auth_error', errorMessage)
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      return Promise.reject(errorMessage) // Penting: reject promise agar catch di komponen terpicu
    }
  },
  async register({ commit }, userDetails) {
    commit('auth_request') // Set status to loading
    try {
      console.log('Sending registration data:', userDetails)
      const response = await axios.post(API_URL + 'register', userDetails)
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      commit('auth_success', userData)
      console.log('Action: register successful')
      return Promise.resolve(userData)
    } catch (error) {
      console.error('Action: register failed', error.response || error)
      console.error('Full error details:', error.response?.data)

      let errorMessage = 'Gagal registrasi. Pengguna mungkin sudah ada atau data tidak valid.'

      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        errorMessage = error.response.data.errors.map((err) => err.msg).join(', ')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      commit('auth_error', errorMessage)
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      return Promise.reject(errorMessage) // Penting: reject promise agar catch di komponen terpicu
    }
  },
  logout({ commit }) {
    console.log('Action: logout - Clearing localStorage and Axios headers')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    commit('logout')
  },
}

export default { namespaced: true, state, getters, mutations, actions }
