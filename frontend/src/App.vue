<template>
  <div id="app" class="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-gray-100">
    <header class="fixed top-0 left-0 z-50 w-full py-4 bg-white border-b border-gray-200 shadow-md">
      <nav class="container flex items-center justify-between px-8 mx-auto">
        <!-- Logo Section -->
        <div class="flex items-center space-x-2">
          <!-- Wrapper untuk logo dan teks -->
          <img
            src="/logo-blog.png"
            alt="My Blog Logo"
            class="object-cover w-8 h-8 rounded-full bg-slate-950 sm:h-10 sm:w-10 animate-logo-pop-image"
          />
          <router-link
            to="/"
            class="text-xl text-indigo-700 transition-all duration-300 ease-in-out text hover:text-indigo-800 lg:text-3xl"
          >
            My Blog
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="items-center hidden space-x-4 md:flex lg:space-x-6">
          <router-link
            to="/"
            class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
            >Home</router-link
          >
          <router-link
            to="/about"
            class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
            >About</router-link
          >

          <template v-if="isAuthenticated">
            <router-link
              v-if="isAdmin"
              to="/admin"
              class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
              >Admin Panel</router-link
            >
            <button
              @click="handleLogout"
              class="px-5 py-2 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg shadow-md hover:bg-red-700"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
              >Login</router-link
            >
            <router-link
              to="/register"
              class="px-5 py-2 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
              >Register</router-link
            >
          </template>
        </div>

        <!-- Mobile Hamburger Icon -->
        <div class="flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle navigation"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              v-else
              class="w-8 h-8"
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
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <transition name="slide">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="fixed top-0 right-0 z-50 w-4/5 h-full max-w-sm bg-white shadow-2xl md:hidden"
      >
        <!-- Mobile Menu Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center space-x-2">
            <img
              src="/logo-blog.png"
              alt="My Blog Logo"
              class="object-cover w-8 h-8 rounded-full"
            />
            <span class="text-xl font-bold text-indigo-700">My Blog</span>
          </div>
          <button
            @click="closeMobileMenu"
            class="p-2 text-gray-700 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close navigation"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Content -->
        <div class="flex flex-col h-full p-6 overflow-y-auto pb-28">
          <nav class="flex flex-col space-y-4">
            <!-- Navigation Links -->
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 transition-all rounded-lg hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </router-link>

            <router-link
              to="/about"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 transition-all rounded-lg hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              About
            </router-link>

            <template v-if="isAuthenticated">
              <router-link
                v-if="isAdmin"
                to="/admin"
                @click="closeMobileMenu"
                class="flex items-center px-4 py-3 text-lg font-medium text-gray-700 transition-all rounded-lg hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Admin Panel
              </router-link>

              <!-- Divider -->
              <div class="my-4 border-t border-gray-200"></div>

              <button
                @click="handleLogoutAndCloseMenu"
                class="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold text-white transition-all bg-red-600 rounded-lg shadow-md hover:bg-red-700 active:scale-95"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </template>

            <template v-else>
              <!-- Divider -->
              <div class="my-4 border-t border-gray-200"></div>

              <router-link
                to="/login"
                @click="closeMobileMenu"
                class="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold text-gray-700 transition-all border-2 border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Login
              </router-link>

              <router-link
                to="/register"
                @click="closeMobileMenu"
                class="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold text-white transition-all bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 active:scale-95"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                Register
              </router-link>
            </template>
          </nav>
        </div>

        <!-- Mobile Menu Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 text-xs text-center text-gray-500 border-t border-gray-200 bg-gray-50">
          <p>&copy; {{ new Date().getFullYear() }} My Blog</p>
        </div>
      </div>
    </transition>

    <main class="container flex-grow px-4 py-10 mx-auto mt-16">
      <router-view />
    </main>

    <footer class="py-6 text-center text-white bg-gray-900 shadow-inner">
      <p class="text-sm">&copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.</p>
      <div class="flex justify-center mt-2 space-x-4 text-gray-400">
        <a href="#" class="hover:text-indigo-500">Privacy Policy</a>
        <a href="#" class="hover:text-indigo-500">Terms of Service</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      isMobileMenuOpen: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isAdmin']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout() {
      console.log('Attempting desktop logout...')
      this.logout()
      this.$router.push({ name: 'login' })
    },
    handleLogoutAndCloseMenu() {
      console.log('Attempting mobile logout...')
      this.logout()
      this.closeMobileMenu()
      this.$router.push({ name: 'login' })
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    },
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* General styles for consistent look */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2d3748;
}
a {
  color: #4c51bf;
}
button {
  background-color: #4c51bf;
}

/* Custom CSS for Text Gradient Logo */
.blog-logo-gradient {
  background-image: linear-gradient(to right, #00bcd4, #8e24aa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  filter: brightness(1);
  text-shadow: none;
}

.blog-logo-gradient:hover {
  filter: brightness(1.2);
  transform: scale(1.02);
  text-shadow: 0 0 8px rgba(142, 36, 170, 0.6);
}

/* Animation for logo pop on load */
@keyframes logoPop {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  80% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-logo-pop {
  animation: logoPop 0.7s ease-out forwards;
}

/* Animation for logo image pop on load */
@keyframes logoPopImage {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-logo-pop-image {
  animation: logoPopImage 0.7s ease-out forwards;
  animation-delay: 0.1s; /* Slightly delayed from text pop */
}

/* Mobile Menu Transitions */
/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from right */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
