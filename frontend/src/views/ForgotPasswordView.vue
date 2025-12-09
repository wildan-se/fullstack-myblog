<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-250px)] p-4">
    <div class="w-full max-w-md p-8 bg-white border border-gray-200 shadow-2xl md:p-10 rounded-xl">
      <div class="mb-6 text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 mb-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">Lupa Password?</h1>
        <p class="mt-2 text-sm text-gray-600">
          Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
        </p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="relative px-4 py-3 mb-6 text-green-700 bg-green-100 border border-green-400 rounded"
        role="alert"
      >
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="flex-1">
            <span class="block text-sm">{{ successMessage }}</span>
            <!-- Development Mode: Show reset link -->
            <div
              v-if="devMode && resetUrl"
              class="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded"
            >
              <p class="text-xs font-semibold text-yellow-800 mb-2">
                🔧 Development Mode - Email belum dikonfigurasi
              </p>
              <p class="text-xs text-yellow-700 mb-2">Klik link di bawah untuk reset password:</p>
              <a
                :href="resetUrl"
                class="block p-2 text-xs text-indigo-600 bg-white border border-indigo-300 rounded hover:bg-indigo-50 break-all"
              >
                {{ resetUrl }}
              </a>
              <p class="text-xs text-yellow-600 mt-2">
                💡 Setup email di backend/.env untuk mode production
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="relative px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
      >
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="block text-sm sm:inline">{{ errorMessage }}</span>
        </div>
      </div>

      <form v-if="!successMessage" @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="nama@email.com"
            required
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 font-bold text-white transition-colors duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:shadow-outline disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="w-5 h-5 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Mengirim...
          </span>
          <span v-else>Kirim Link Reset Password</span>
        </button>

        <div class="mt-6 text-center">
          <router-link
            to="/login"
            class="inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Login
          </router-link>
        </div>
      </form>

      <div v-else class="text-center">
        <router-link
          to="/login"
          class="inline-block px-6 py-3 mt-4 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Kembali ke Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
      devMode: false,
      resetUrl: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''
      this.devMode = false
      this.resetUrl = ''

      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
          email: this.email,
        })

        this.successMessage = response.data.message

        // Check if in development mode
        if (response.data.devMode && response.data.resetUrl) {
          this.devMode = true
          this.resetUrl = response.data.resetUrl
        }

        this.email = ''
      } catch (error) {
        console.error('Forgot password error:', error)
        this.errorMessage =
          error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi nanti.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
