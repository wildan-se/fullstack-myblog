// 1. Importasi Pustaka dan Komponen
import { createRouter, createWebHistory } from 'vue-router' // Mengimpor fungsi inti dari vue-router
import HomeView from '../views/HomeView.vue' // Mengimpor komponen tampilan untuk halaman utama
import PostDetailView from '../views/PostDetailView.vue' // Mengimpor komponen tampilan untuk detail postingan
import LoginView from '../views/LoginView.vue' // Mengimpor komponen tampilan untuk login
import RegisterView from '../views/RegisterView.vue' // Mengimpor komponen tampilan untuk registrasi
import ForgotPasswordView from '../views/ForgotPasswordView.vue' // Mengimpor komponen tampilan untuk lupa password
import ResetPasswordView from '../views/ResetPasswordView.vue' // Mengimpor komponen tampilan untuk reset password
import AdminDashboard from '../views/admin/AdminDashboard.vue' // Mengimpor komponen dashboard admin
import PostManagement from '../views/admin/PostManagement.vue' // Mengimpor komponen manajemen postingan admin
import CategoryManagement from '../views/admin/CategoryManagement.vue' // Mengimpor komponen manajemen kategori admin
import PostForm from '../views/admin/PostForm.vue' // Mengimpor komponen formulir postingan (untuk buat/edit)
import store from '../store' // Mengimpor Vuex store Anda untuk akses ke state otentikasi

// 2. Definisi Array Rute (routes)
// Array ini berisi objek-objek, di mana setiap objek mendefinisikan sebuah rute di aplikasi.
const routes = [
  // Rute Halaman Utama
  {
    path: '/', // Jalur URL yang akan dicocokkan (misal: http://localhost:5173/)
    name: 'home', // Nama unik untuk rute ini, berguna untuk navigasi terprogram (misal: router.push({ name: 'home' }))
    component: HomeView, // Komponen Vue yang akan dirender ketika rute ini aktif
  },

  // Rute Detail Postingan
  {
    path: '/post/:slug', // Jalur URL dengan parameter dinamis ':slug' (misal: /post/judul-postingan-saya)
    name: 'postDetail', // Nama rute
    component: PostDetailView, // Komponen yang akan dirender
    props: true, // Memberi tahu vue-router untuk meneruskan parameter rute (seperti 'slug') sebagai props ke komponen PostDetailView.
  },

  // Rute Login
  { path: '/login', name: 'login', component: LoginView },

  // Rute Registrasi
  { path: '/register', name: 'register', component: RegisterView },

  // Rute Lupa Password
  { path: '/forgot-password', name: 'forgotPassword', component: ForgotPasswordView },

  // Rute Reset Password
  { path: '/reset-password/:token', name: 'resetPassword', component: ResetPasswordView },

  // Rute Admin Dashboard (Rute Induk dengan Rute Anak)
  {
    path: '/admin', // Jalur URL untuk dashboard admin (misal: /admin)
    name: 'adminDashboard', // Nama rute induk
    component: AdminDashboard, // Komponen yang akan dirender untuk rute induk ini
    meta: { requiresAuth: true, requiresAdmin: true }, // Objek 'meta' berisi metadata kustom untuk rute ini.
    // 'requiresAuth: true' berarti rute ini memerlukan pengguna terautentikasi.
    // 'requiresAdmin: true' berarti rute ini memerlukan peran 'admin'.
    children: [
      // Array 'children' mendefinisikan rute-rute anak yang akan dirender di dalam komponen induk (AdminDashboard).
      // Rute Manajemen Postingan Admin
      {
        path: 'posts', // Jalur relatif terhadap induk: /admin/posts
        name: 'adminPosts', // Nama rute anak
        component: PostManagement, // Komponen yang akan dirender
        meta: { requiresAuth: true, requiresAdmin: true }, // Rute anak ini juga memerlukan otentikasi dan peran admin.
      },
      // Rute Buat Postingan Baru
      {
        path: 'posts/new', // Jalur relatif: /admin/posts/new
        name: 'newPost', // Nama rute
        component: PostForm, // Menggunakan komponen formulir postingan
        meta: { requiresAuth: true, requiresAdmin: true, isEditing: false }, // Menambahkan 'isEditing: false' sebagai meta untuk menunjukkan ini adalah mode pembuatan.
      },
      // Rute Edit Postingan
      {
        path: 'posts/edit/:id', // Jalur relatif dengan parameter dinamis ':id': /admin/posts/edit/123
        name: 'editPost', // Nama rute
        component: PostForm, // Menggunakan komponen formulir postingan yang sama
        props: true, // Meneruskan ':id' sebagai prop ke komponen PostForm
        meta: { requiresAuth: true, requiresAdmin: true, isEditing: true }, // Menambahkan 'isEditing: true' sebagai meta untuk menunjukkan ini adalah mode edit.
      },
      // Rute Manajemen Kategori Admin
      {
        path: 'categories', // Jalur relatif: /admin/categories
        name: 'adminCategories', // Nama rute anak
        component: CategoryManagement, // Komponen yang akan dirender
        meta: { requiresAuth: true, requiresAdmin: true }, // Memerlukan otentikasi dan peran admin.
      },
    ],
  },

  // Rute Halaman About
  {
    path: '/about', // Jalur URL
    name: 'about', // Nama rute
    // 'component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')'
    // Ini adalah 'lazy loading' atau 'code splitting'. Komponen AboutView hanya akan dimuat
    // ketika rute '/about' diakses, bukan saat aplikasi pertama kali dimuat. Ini membantu
    // mengurangi ukuran bundle awal aplikasi dan mempercepat waktu muat.
    // 'webpackChunkName: "about"' adalah komentar yang memberi tahu Webpack (atau Vite)
    // untuk mengelompokkan modul ini ke dalam chunk terpisah bernama 'about'.
    component: () => import('../views/AboutView.vue'),
  },
]

// 3. Membuat Instance Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Mengatur mode sejarah router.
  // 'createWebHistory' menggunakan History API HTML5 untuk URL yang bersih (tanpa '#').
  // 'import.meta.env.BASE_URL' adalah variabel lingkungan Vite yang menyediakan base URL aplikasi,
  // penting jika aplikasi di-deploy di sub-direktori.
  routes, // Meneruskan array rute yang telah didefinisikan di atas.
})

// 4. Navigation Guard (Penjaga Navigasi)
// 'router.beforeEach' adalah global navigation guard yang dieksekusi sebelum setiap navigasi.
// Ini digunakan untuk menerapkan logika otentikasi dan otorisasi.
router.beforeEach((to, from, next) => {
  // 'to': Objek rute tujuan (rute yang akan dituju).
  // 'from': Objek rute asal (rute saat ini).
  // 'next': Fungsi yang harus dipanggil untuk menyelesaikan hook.
  //         - next(): lanjutkan navigasi.
  //         - next(false): batalkan navigasi.
  //         - next('/login'): alihkan ke rute lain.

  // Mengambil status otentikasi dan peran admin dari Vuex store.
  const isAuthenticated = store.getters['auth/isAuthenticated'] // True jika pengguna login
  const isAdmin = store.getters['auth/isAdmin'] // True jika pengguna adalah admin

  // Logika Proteksi Rute:
  // a. Jika rute tujuan memerlukan otentikasi DAN pengguna TIDAK terautentikasi
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Alihkan pengguna ke halaman login.
  }
  // b. Jika rute tujuan memerlukan peran admin DAN pengguna BUKAN admin
  else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' }) // Alihkan pengguna ke halaman utama (atau halaman 403 Forbidden).
  }
  // c. Jika tidak ada kondisi proteksi yang terpenuhi (pengguna diizinkan mengakses rute)
  else {
    next() // Lanjutkan navigasi ke rute tujuan.
  }
})

// 5. Ekspor Router
export default router // Mengekspor instance router agar dapat digunakan di file main.js untuk menginisialisasi aplikasi Vue.
