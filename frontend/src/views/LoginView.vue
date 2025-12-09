<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-250px)] p-4">
    <div class="w-full max-w-md p-8 bg-white border border-gray-200 shadow-2xl md:p-10 rounded-xl">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-7">Login ke Akun Anda</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @blur="validateEmail"
            @input="clearAuthError"
            class="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': emailError }"
            required
          />
          <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
        </div>
        <div class="mb-7">
          <label for="password" class="block mb-2 text-sm font-semibold text-gray-700"
            >Password:</label
          >
          <div class="relative">
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              @blur="validatePassword"
              @input="clearAuthError"
              class="w-full px-4 py-2 pr-10 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': passwordError }"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle password visibility"
            >
              <svg
                v-if="passwordFieldType === 'password'"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 .31-1.24"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 1 12 4c7 0 10 7 10 7a1.8 1.8 0 0 1-.31 1.24"
                />
                <path d="M11.61 11.61a3 3 0 1 0-3.43-3.43" />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
          <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
        </div>
        <!-- Pesan error validasi client-side (ini tetap ada untuk validasi lokal) -->
        <!-- Pop-up peringatan dari Backend akan ditampilkan melalui modal -->
        <div class="flex items-center justify-center">
          <button
            type="submit"
            :disabled="!isFormValid || authStatus === 'loading'"
            class="w-full px-4 py-3 font-bold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {{ authStatus === 'loading' ? 'Sedang Login...' : 'Login' }}
          </button>
        </div>
        <div class="flex items-center justify-between mt-4">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <router-link to="/register" class="font-medium text-blue-600 hover:underline"
              >Daftar di sini</router-link
            >
          </p>
          <router-link
            to="/forgot-password"
            class="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
          >
            Lupa Password?
          </router-link>
        </div>
      </form>
    </div>

    <!-- Custom Error Modal/Pop-up -->
    <transition name="modal-fade">
      <div
        v-if="showErrorModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="relative w-full max-w-sm p-8 text-center bg-white rounded-lg shadow-xl">
          <button
            @click="closeErrorModal"
            class="absolute text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <svg
            class="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-3 text-xl font-bold text-gray-800">Login Gagal!</h3>
          <p class="text-gray-700">{{ authError }}</p>
          <button
            @click="closeErrorModal"
            class="px-4 py-2 mt-6 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Tutup
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      emailError: '',
      passwordError: '',
      showErrorModal: false, // State untuk mengontrol visibilitas modal error
    }
  },
  computed: {
    ...mapState('auth', ['authStatus']),
    ...mapGetters('auth', ['authError']),
    isFormValid() {
      const isValid =
        !this.emailError &&
        !this.passwordError &&
        this.email.trim() !== '' &&
        this.password.trim() !== ''
      console.log(
        'Computed isFormValid:',
        isValid,
        'Email:',
        this.email,
        'Pass:',
        this.password,
        'EmailError:',
        this.emailError,
        'PassError:',
        this.passwordError,
      )
      return isValid
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    validateEmail() {
      if (!this.email.trim()) {
        this.emailError = 'Email wajib diisi.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = 'Format email tidak valid.'
      } else {
        this.emailError = ''
      }
      console.log('validateEmail. emailError:', this.emailError)
    },
    validatePassword() {
      if (!this.password.trim()) {
        this.passwordError = 'Kata sandi wajib diisi.'
      } else {
        this.passwordError = ''
      }
      console.log('validatePassword. passwordError:', this.passwordError)
    },
    clearAuthError() {
      // Membersihkan error dari store dan menyembunyikan modal saat input berubah
      if (this.authError) {
        console.log('clearAuthError: Membersihkan pesan error backend dan menyembunyikan modal.')
        this.$store.commit('auth/auth_error', null)
        this.showErrorModal = false
      }
    },
    async submitForm() {
      console.log('submitForm called.')
      // Clear any previous backend error before new submission attempt
      if (this.authError) {
        this.$store.commit('auth/auth_error', null)
      }
      this.showErrorModal = false // Ensure modal is hidden before new attempt

      // Trigger semua validasi client-side sebelum submit
      this.validateEmail()
      this.validatePassword()

      console.log('After client-side validation. isFormValid:', this.isFormValid)

      // Hentikan submit jika validasi client-side gagal
      if (!this.isFormValid) {
        console.log('Form tidak valid (client-side validation failed). Menghentikan submit.')
        return
      }

      try {
        console.log('Mencoba memanggil aksi login Vuex...')
        await this.login({ email: this.email, password: this.password })

        // Jika kode mencapai sini, berarti aksi login berhasil (Promise resolve)
        console.log('Login berhasil, mengarahkan ke halaman utama.')
        this.$router.push('/')
      } catch (error) {
        // Catch block ini akan dijangkau jika this.login() me-reject promise-nya (misal: login gagal dari backend).
        console.error('Login gagal (caught in submitForm catch block):', error)
        console.log('Pesan error dari store (saat ini):', this.authError)

        // Tampilkan modal error jika ada pesan error dari backend
        if (this.authError) {
          console.log('Menampilkan modal error dengan pesan:', this.authError)
          this.showErrorModal = true
        } else {
          // Fallback message jika authError kosong tapi catch block dijangkau (kasus jarang)
          console.warn(
            'Catch block dijangkau, tetapi authError kosong. Menggunakan pesan fallback.',
          )
          this.$store.commit(
            'auth/auth_error',
            'Terjadi kesalahan tidak dikenal saat login. Mohon coba lagi.',
          )
          this.showErrorModal = true
        }
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    closeErrorModal() {
      console.log('closeErrorModal called. Menutup modal dan membersihkan error.')
      this.showErrorModal = false
      this.$store.commit('auth/auth_error', null) // Bersihkan pesan error dari store saat modal ditutup
    },
  },
}
</script>
