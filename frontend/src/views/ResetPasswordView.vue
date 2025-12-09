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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">Buat Password Baru</h1>
        <p class="mt-2 text-sm text-gray-600">
          Masukkan password baru untuk akun Anda. Pastikan password kuat dan aman.
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
          <span class="block text-sm sm:inline">{{ successMessage }}</span>
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
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-semibold text-gray-700">
            Password Baru
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full px-4 py-3 pr-10 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Minimal 6 karakter"
              required
              minlength="6"
              :disabled="loading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              :disabled="loading"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
          <p class="mt-1 text-xs text-gray-500">Password harus minimal 6 karakter</p>
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="block mb-2 text-sm font-semibold text-gray-700">
            Konfirmasi Password
          </label>
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full px-4 py-3 pr-10 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ketik ulang password"
              required
              minlength="6"
              :disabled="loading"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              :disabled="loading"
            >
              <svg
                v-if="!showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Password strength indicator -->
        <div v-if="password" class="mb-6">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-semibold text-gray-600">Kekuatan Password:</span>
            <span
              class="text-xs font-semibold"
              :class="{
                'text-red-600': passwordStrength === 'Lemah',
                'text-yellow-600': passwordStrength === 'Sedang',
                'text-green-600': passwordStrength === 'Kuat',
              }"
            >
              {{ passwordStrength }}
            </span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full transition-all duration-300"
              :class="{
                'bg-red-500 w-1/3': passwordStrength === 'Lemah',
                'bg-yellow-500 w-2/3': passwordStrength === 'Sedang',
                'bg-green-500 w-full': passwordStrength === 'Kuat',
              }"
            ></div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading || password !== confirmPassword || password.length < 6"
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
            Mereset Password...
          </span>
          <span v-else>Reset Password</span>
        </button>

        <p v-if="password !== confirmPassword && confirmPassword" class="mt-2 text-sm text-red-600">
          Password tidak cocok
        </p>
      </form>

      <div v-else class="text-center">
        <p class="mb-4 text-gray-600">Password Anda telah berhasil direset!</p>
        <router-link
          to="/login"
          class="inline-block px-6 py-3 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Login Sekarang
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResetPasswordView',
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      successMessage: '',
      errorMessage: '',
    }
  },
  computed: {
    passwordStrength() {
      const password = this.password
      if (password.length < 6) return 'Lemah'
      if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'Kuat'
      return 'Sedang'
    },
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Password tidak cocok'
        return
      }

      if (this.password.length < 6) {
        this.errorMessage = 'Password harus minimal 6 karakter'
        return
      }

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
        const token = this.$route.params.token

        if (!token) {
          this.errorMessage = 'Token reset password tidak valid atau sudah kedaluwarsa'
          this.loading = false
          return
        }

        const response = await axios.put(`${API_BASE}/api/auth/reset-password/${token}`, {
          password: this.password,
        })

        this.successMessage = response.data.message

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error) {
        console.error('Reset password error:', error)
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
