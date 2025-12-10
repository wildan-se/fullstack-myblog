<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-250px)] p-4">
    <div class="w-full max-w-md p-8 bg-white border border-gray-200 shadow-2xl md:p-10 rounded-xl transition-all duration-300">
      
      <div class="mb-6 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 mb-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg transform transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">Lupa Password?</h1>
        <p class="mt-2 text-sm text-gray-600">
          Masukkan email Anda dan kami akan memproses permintaan pemulihan akun.
        </p>
      </div>

      <transition name="fade">
        <div v-if="errorMessage" class="relative px-4 py-3 mb-6 text-red-700 bg-red-50 border-l-4 border-red-500 rounded shadow-sm" role="alert">
          <div class="flex items-start">
            <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="block text-sm font-medium">{{ errorMessage }}</span>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="successMessage" class="space-y-6">
          
          <div v-if="!devMode" class="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <div class="flex justify-center mb-2">
              <div class="bg-green-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-bold text-green-800">Email Terkirim!</h3>
            <p class="text-sm text-green-700 mt-1">Silakan cek inbox email Anda.</p>
          </div>

          <div v-if="devMode && resetUrl" class="mt-6 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm animate-fade-in-up">
            <div class="px-4 py-4 bg-indigo-50 border-b border-indigo-100 flex items-center">
              <div class="p-2 bg-white rounded-full shadow-sm mr-3">
                <svg class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-indigo-900">Akses Pemulihan Akun</h3>
                <p class="text-xs text-indigo-700">Link reset password Anda telah siap.</p>
              </div>
            </div>

            <div class="p-5">
              <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                Untuk keamanan, silakan gunakan link verifikasi unik di bawah ini untuk membuat password baru Anda.
              </p>

              <div class="relative group mb-4">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input 
                  readonly 
                  :value="resetUrl" 
                  class="block w-full pl-10 pr-24 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono"
                  ref="linkInput"
                >
                <button 
                  @click="copyLink" 
                  type="button"
                  class="absolute inset-y-1 right-1 px-4 flex items-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md text-xs font-medium transition-colors shadow-sm"
                >
                  <span v-if="copied" class="text-green-600 flex items-center font-bold">
                    <svg class="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Disalin
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Salin
                  </span>
                </button>
              </div>

              <a 
                :href="resetUrl" 
                class="flex w-full items-center justify-center px-4 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md transform hover:-translate-y-0.5"
              >
                Lanjut Reset Password &rarr;
              </a>
            </div>
          </div>

          <div class="text-center pt-2">
            <router-link to="/login" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              &larr; Kembali ke Login
            </router-link>
          </div>
        </div>
      </transition>

      <form v-if="!successMessage" @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full pl-10 pr-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="nama@email.com"
              required
              :disabled="loading"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          </span>
          <span v-else>Kirim Link Reset</span>
        </button>

        <div class="mt-8 text-center border-t border-gray-100 pt-6">
          <router-link
            to="/login"
            class="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Halaman Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: 'ForgotPasswordView',
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      email: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
      devMode: false,
      resetUrl: '',
      copied: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''
      this.devMode = false
      this.resetUrl = ''
      this.copied = false

      // Gunakan ENV variable agar dinamis (Localhost vs Production)
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

      try {
        const response = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
          email: this.email,
        })

        // Sukses: Set message untuk memicu transisi UI
        this.successMessage = response.data.message

        // Cek apakah backend mengirim respon mode development (tanpa email)
        if (response.data.devMode && response.data.resetUrl) {
          this.devMode = true
          this.resetUrl = response.data.resetUrl
          // Opsional: Toast notifikasi halus
          if(this.toast) this.toast.success("Link pemulihan berhasil dibuat")
        } else {
          // Mode Email Asli (jika SMTP aktif)
          if(this.toast) this.toast.success("Email reset password berhasil dikirim!")
        }

        this.email = ''
      } catch (error) {
        console.error('Forgot password error:', error)
        this.errorMessage =
          error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi nanti.'
        if(this.toast) this.toast.error(this.errorMessage)
      } finally {
        this.loading = false
      }
    },
    
    // Fitur Copy Link
    async copyLink() {
      if (!this.resetUrl) return
      
      try {
        await navigator.clipboard.writeText(this.resetUrl)
        this.copied = true
        if (this.toast) this.toast.info("Link tersalin ke clipboard")
        
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
        // Fallback untuk browser lama
        this.$refs.linkInput.select()
        document.execCommand('copy')
        this.copied = true
        if (this.toast) this.toast.info("Link tersalin")
      }
    },
  },
}
</script>

<style scoped>
/* Transisi Animasi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>