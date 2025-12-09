<template>
  <div class="container px-4 py-8 mx-auto home-view">
    <!-- Hero Section -->
    <section
      class="p-8 mt-4 mb-16 text-center text-white transition-transform duration-500 ease-in-out transform shadow-xl bg-gradient-to-r from-indigo-600 to-purple-700 md:p-12 rounded-2xl"
    >
      <h1
        class="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl animate-fade-in-down"
      >
        Selamat Datang di <span class="text-yellow-300 drop-shadow-lg">MyBlog</span>
      </h1>
      <p class="max-w-3xl mx-auto text-lg leading-relaxed sm:text-xl opacity-90 animate-fade-in-up">
        Temukan artikel-artikel terbaru dan inspiratif seputar teknologi, pengembangan web, dan
        banyak lagi.
      </p>
      <router-link
        to="/about"
        class="relative z-10 inline-flex items-center px-3 py-4 mt-4 overflow-hidden text-sm font-bold text-indigo-800 transition-all duration-300 ease-in-out transform bg-white rounded-full shadow-lg lg:px-8 lg:py-5 lg:text-xl hover:bg-gray-100 hover:text-indigo-900 hover:translate-x-2 group animate-fade-in-up-stagger-2"
      >
        <span
          class="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 bg-gradient-to-r from-indigo-100 to-purple-100 group-hover:opacity-100"
        ></span>
        <span class="relative z-10 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-3 transition-transform duration-300 lucide lucide-info group-hover:rotate-12 group-hover:scale-110"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          Pelajari Lebih Lanjut
        </span>
      </router-link>
    </section>

    <h2 class="mb-8 text-3xl font-bold text-center text-gray-800 sm:text-4xl animate-fade-in">
      Postingan Terbaru
    </h2>

    <!-- Loading State -->
    <div v-if="postsLoading" class="py-12 text-center text-gray-600">
      <p class="mb-4 text-2xl animate-pulse">Memuat postingan...</p>
      <div
        class="w-16 h-16 mx-auto mt-4 border-4 border-t-4 border-indigo-500 rounded-full animate-spin-slow"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="postsError"
      class="p-6 py-12 text-center text-red-600 shadow-md bg-red-50 rounded-xl"
    >
      <p class="mb-4 text-2xl font-semibold">Terjadi kesalahan saat memuat postingan:</p>
      <p class="text-lg">{{ postsError }}</p>
      <button
        @click="fetchPosts({ status: 'published' })"
        class="px-6 py-3 mt-6 text-white transition-colors duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
      >
        Coba Lagi
      </button>
    </div>

    <!-- No Posts State -->
    <div
      v-else-if="allPosts.length === 0"
      class="p-6 py-12 text-center text-gray-500 shadow-md bg-gray-50 rounded-xl"
    >
      <p class="text-2xl font-semibold">Belum ada postingan yang diterbitkan.</p>
      <p class="mt-2 text-lg">Nantikan konten menarik dari kami!</p>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="post in allPosts"
        :key="post._id"
        class="post-card bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl animate-fade-in-up"
      >
        <div class="w-full h-56 overflow-hidden bg-gray-200">
          <img
            :src="post.image || '/uploads/default-post.jpg'"
            :alt="post.title"
            class="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            @error="handleImageError"
          />
        </div>

        <div class="flex flex-col justify-between h-auto p-6">
          <div>
            <h3 class="mb-3 text-2xl font-semibold leading-tight text-gray-900">
              <router-link
                :to="`/post/${post.slug}`"
                class="transition-colors duration-200 hover:text-indigo-700"
                >{{ post.title }}</router-link
              >
            </h3>
            <p class="flex flex-wrap items-center mb-4 text-sm text-gray-600">
              Oleh
              <span class="ml-1 mr-2 font-medium text-indigo-700">{{
                post.author?.name || 'Unknown'
              }}</span>
              pada
              <span class="ml-1 mr-2">{{
                new Date(post.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}</span>
              <span
                v-if="post.category"
                class="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 sm:mt-0"
                >{{ post.category?.name || 'Uncategorized' }}</span
              >
            </p>
            <p
              class="mb-5 text-base text-gray-700 line-clamp-3"
              v-html="truncateContent(post.content, 120)"
            ></p>
          </div>
          <router-link
            :to="`/post/${post.slug}`"
            class="inline-flex items-center self-end mt-4 font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-800"
          >
            Baca Selengkapnya
            <svg
              class="w-4 h-4 ml-2 transition-transform duration-200 transform translate-x-0 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="postsPagination.pages > 1"
      class="flex flex-col items-center justify-center mt-12 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
    >
      <button
        @click="changePage(postsPagination.page - 1)"
        :disabled="postsPagination.page === 1 || postsLoading"
        class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 transform hover:-translate-y-0.5"
      >
        Sebelumnya
      </button>
      <span class="px-5 py-2 font-medium text-gray-800 bg-gray-200 rounded-lg shadow-inner">
        Halaman {{ postsPagination.page }} / {{ postsPagination.pages }}
      </span>
      <button
        @click="changePage(postsPagination.page + 1)"
        :disabled="postsPagination.page === postsPagination.pages || postsLoading"
        class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 transform hover:-translate-y-0.5"
      >
        Berikutnya
      </button>
    </div>
  </div>
</template>

<script>
// 1. Importasi Helper Vuex
// mapActions: Helper dari Vuex yang memungkinkan kita untuk memetakan (map) actions dari Vuex store
//             ke metode (methods) di dalam komponen Vue. Ini membuat pemanggilan actions lebih singkat.
// mapGetters: Helper dari Vuex yang memungkinkan kita untuk memetakan (map) getters dari Vuex store
//             ke properti computed di dalam komponen Vue. Ini membuat akses ke state store lebih mudah.
import { mapActions, mapGetters } from 'vuex'

export default {
  // 2. Opsi Komponen Vue
  // name: Properti opsional yang memberikan nama untuk komponen. Berguna untuk debugging di Vue Devtools
  //       dan untuk rekursi komponen.
  name: 'HomeView',

  // 3. Lifecycle Hook: created()
  // created(): Ini adalah salah satu dari banyak "lifecycle hooks" di Vue.
  //            Hook ini dipanggil setelah instance komponen telah dibuat,
  //            properti data dan computed telah diinisialisasi,
  //            tetapi DOM belum dirender.
  //            Ini adalah tempat yang ideal untuk melakukan panggilan API awal
  //            untuk memuat data yang dibutuhkan komponen.
  created() {
    // PENTING: Selalu minta postingan dengan status 'published' untuk halaman beranda
    // this.fetchPosts: Memanggil aksi Vuex bernama 'fetchPosts' yang telah dipetakan
    //                  ke metode komponen ini melalui `mapActions`.
    // { status: 'published' }: Meneruskan objek sebagai payload (data) ke aksi `fetchPosts`.
    //                          Secara spesifik, ini meminta postingan yang hanya memiliki status 'published'.
    //                          Ini penting agar postingan 'draft' tidak muncul di halaman utama,
    //                          bahkan jika pengguna adalah admin yang sedang login.
    this.fetchPosts({ status: 'published' })
  },

  // 4. Computed Properties
  // computed: Objek ini berisi properti yang nilainya dihitung berdasarkan dependensi reaktif.
  //           Nilai computed di-cache dan hanya akan dihitung ulang jika dependensi reaktifnya berubah.
  //           Ini efisien karena tidak akan menjalankan fungsi setiap kali komponen dirender ulang
  //           jika dependensi tidak berubah.
  computed: {
    // ...mapGetters('posts', [...]): Menggunakan operator spread (...) untuk memetakan
    //                                  beberapa getters dari modul Vuex 'posts' ke properti computed di komponen ini.
    // 'allPosts': Akan menjadi properti computed yang nilainya sama dengan `store.getters['posts/allPosts']`.
    //             Berisi array semua postingan yang telah dimuat.
    // 'postsLoading': Akan menjadi properti computed yang nilainya sama dengan `store.getters['posts/postsLoading']`.
    //                 Berisi boolean yang menunjukkan apakah data postingan sedang dimuat.
    // 'postsError': Akan menjadi properti computed yang nilainya sama dengan `store.getters['posts/postsError']`.
    //               Berisi string pesan error jika terjadi kesalahan saat memuat postingan.
    // 'postsPagination': Akan menjadi properti computed yang nilainya sama dengan `store.getters['posts/postsPagination']`.
    //                    Berisi objek dengan informasi pagination (page, pages, count).
    ...mapGetters('posts', ['allPosts', 'postsLoading', 'postsError', 'postsPagination']),
  },

  // 5. Methods
  // methods: Objek ini berisi fungsi-fungsi yang dapat dipanggil dari template (melalui event listeners seperti @click)
  //          atau dari dalam metode/lifecycle hooks komponen lainnya.
  methods: {
    // ...mapActions('posts', ['fetchPosts']): Menggunakan operator spread (...) untuk memetakan
    //                                       aksi Vuex 'fetchPosts' dari modul 'posts' ke metode di komponen ini.
    // fetchPosts: Sekarang dapat dipanggil sebagai `this.fetchPosts(...)`.
    ...mapActions('posts', ['fetchPosts']),

    // truncateContent(content, length): Metode untuk memotong string konten HTML menjadi teks biasa
    //                                    dengan panjang tertentu dan menambahkan elipsis.
    // content: String konten postingan (bisa berupa HTML).
    // length: Batas panjang karakter yang diinginkan.
    truncateContent(content, length) {
      // Create a temporary div to parse HTML and get plain text
      // document.createElement('div'): Membuat elemen DIV HTML di memori (tidak ditambahkan ke DOM).
      const div = document.createElement('div')
      // div.innerHTML = content: Mengatur innerHTML dari div sementara dengan konten postingan.
      //                        Browser secara otomatis akan mengurai HTML ini menjadi struktur DOM.
      div.innerHTML = content
      // let text = div.textContent || div.innerText || '': Mengambil teks biasa dari div.
      //                                                textContent adalah cara modern, innerText adalah fallback untuk browser lama.
      //                                                Ini efektif menghilangkan semua tag HTML dari konten.
      let text = div.textContent || div.innerText || '' // Fallback for older browsers

      // Memeriksa apakah panjang teks melebihi batas yang ditentukan.
      if (text.length > length) {
        // Jika ya, potong teks dari awal hingga `length` karakter, lalu tambahkan "..." di akhirnya.
        text = text.substring(0, length) + '...' // Add ellipsis
      }
      return text // Mengembalikan teks yang sudah dipotong.
    },

    // changePage(newPage): Metode untuk mengubah halaman postingan yang ditampilkan.
    // newPage: Nomor halaman yang ingin ditampilkan.
    changePage(newPage) {
      // Pastikan untuk meneruskan status 'published' saat mengganti halaman
      // this.fetchPosts: Memanggil aksi Vuex untuk memuat postingan.
      // { page: newPage, status: 'published' }: Meneruskan nomor halaman baru dan
      //                                      memastikan filter status 'published' tetap aktif
      //                                      saat navigasi pagination.
      this.fetchPosts({ page: newPage, status: 'published' })
    },

    // handleImageError(event): Metode untuk menangani error saat gambar gagal dimuat.
    // event: Objek event yang dipicu saat error (misal, dari atribut @error pada tag <img>).
    handleImageError(event) {
      // Fallback for broken images
      // event.target: Merujuk pada elemen DOM yang memicu event (yaitu, tag <img>).
      // event.target.src = '/uploads/default-post.jpg': Mengubah atribut `src` dari gambar yang rusak
      //                                                   menjadi URL gambar placeholder default.
      event.target.src = '/uploads/default-post.jpg'
    },
  },
}
</script>

<style scoped>
/* Custom Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.2s; /* Delay for sequential animation */
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.4s; /* Delay for sequential animation */
}

.animate-spin-slow {
  animation: spinSlow 2s linear infinite;
}

.animate-bounce-in {
  animation: bounceIn 1s forwards;
  animation-delay: 0.6s; /* Delay for sequential animation */
}

/* Ensure image takes full height of its container when object-cover is used */
.post-card img {
  height: 100%;
}

/* Custom styling for the read more link SVG */
.post-card a svg {
  transition: transform 0.2s ease-in-out;
}
.post-card a:hover svg {
  transform: translateX(4px); /* Move arrow slightly on hover */
}
</style>
