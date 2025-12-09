<template>
  <div class="relative min-h-screen overflow-hidden about-page">
    <!-- Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>

    <div class="relative z-10 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div
        class="py-16 mb-16 text-white shadow-2xl md:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl animate-fade-in"
      >
        <div class="max-w-4xl px-6 mx-auto text-center">
          <h1 class="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Tentang <span class="text-yellow-300">MyBlog</span>
          </h1>
          <p class="max-w-3xl mx-auto text-lg leading-relaxed sm:text-xl opacity-90">
            Platform berbagi informasi menarik dan bermanfaat untuk semua
          </p>
        </div>
      </div>

      <!-- Mission Statement -->
      <div class="p-8 mb-12 bg-white shadow-lg md:p-12 rounded-2xl animate-slide-up">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block p-3 mb-6 rounded-full bg-indigo-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 class="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl">Misi Kami</h2>
          <p class="mb-4 text-lg leading-relaxed text-gray-700">
            MyBlog hadir untuk
            <span class="font-semibold text-indigo-600"
              >memberikan informasi yang menarik dan bermanfaat</span
            >
            bagi semua pembaca. Kami percaya bahwa berbagi pengetahuan adalah cara terbaik untuk
            tumbuh bersama.
          </p>
          <p class="text-lg leading-relaxed text-gray-700">
            Dari teknologi hingga kehidupan sehari-hari, kami berusaha menghadirkan konten
            berkualitas yang mudah dipahami dan relevan dengan kebutuhan Anda.
          </p>
        </div>
      </div>

      <!-- Value Proposition -->
      <div
        class="p-8 mb-12 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 md:p-12 rounded-2xl animate-slide-up"
      >
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="mb-8 text-3xl font-bold text-gray-800 sm:text-4xl">Mengapa MyBlog?</h2>
          <div class="grid gap-6 md:grid-cols-3">
            <!-- Card 1 -->
            <div
              class="p-6 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div class="mb-4 text-4xl">📚</div>
              <h3 class="mb-3 text-xl font-semibold text-gray-800">Mudah Dipahami</h3>
              <p class="text-gray-600">
                Penjelasan sederhana dan jelas, cocok untuk semua kalangan
              </p>
            </div>

            <!-- Card 2 -->
            <div
              class="p-6 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div class="mb-4 text-4xl">✨</div>
              <h3 class="mb-3 text-xl font-semibold text-gray-800">Konten Berkualitas</h3>
              <p class="text-gray-600">Artikel yang informatif, akurat, dan selalu up-to-date</p>
            </div>

            <!-- Card 3 -->
            <div
              class="p-6 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
            >
              <div class="mb-4 text-4xl">🎯</div>
              <h3 class="mb-3 text-xl font-semibold text-gray-800">Beragam Topik</h3>
              <p class="text-gray-600">Dari teknologi hingga lifestyle, semua ada di sini</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Topics -->
      <div class="p-8 mb-12 bg-white shadow-lg md:p-12 rounded-2xl animate-slide-up">
        <div class="max-w-5xl mx-auto">
          <h2 class="mb-8 text-3xl font-bold text-center text-gray-800 sm:text-4xl">
            Topik yang Kami Bahas
          </h2>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Frontend -->
            <div
              class="p-6 transition-all duration-300 border-2 border-indigo-200 rounded-xl hover:border-indigo-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-indigo-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Frontend Development</h3>
              </div>
              <p class="text-gray-600">Vue.js, React, HTML, CSS, dan teknologi frontend modern</p>
            </div>

            <!-- Backend -->
            <div
              class="p-6 transition-all duration-300 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Backend Development</h3>
              </div>
              <p class="text-gray-600">
                Node.js, Express, MongoDB, API, dan server-side programming
              </p>
            </div>

            <!-- Otomotif -->
            <div
              class="p-6 transition-all duration-300 border-2 border-red-200 rounded-xl hover:border-red-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Otomotif</h3>
              </div>
              <p class="text-gray-600">
                Tips perawatan kendaraan, review mobil & motor, dan berita otomotif
              </p>
            </div>

            <!-- Kuliner -->
            <div
              class="p-6 transition-all duration-300 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-orange-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Kuliner & Masakan</h3>
              </div>
              <p class="text-gray-600">Resep masakan, review restoran, dan tips memasak praktis</p>
            </div>

            <!-- Lifestyle -->
            <div
              class="p-6 transition-all duration-300 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Lifestyle</h3>
              </div>
              <p class="text-gray-600">
                Kesehatan, hobi, traveling, dan tips kehidupan sehari-hari
              </p>
            </div>

            <!-- Dan Lainnya -->
            <div
              class="p-6 transition-all duration-300 border-2 border-pink-200 rounded-xl hover:border-pink-400 hover:shadow-lg"
            >
              <div class="flex items-center mb-4">
                <div class="p-2 mr-3 rounded-lg bg-pink-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-pink-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Dan Banyak Lagi!</h3>
              </div>
              <p class="text-gray-600">Topik menarik lainnya yang selalu update dan relevan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- About Author -->
      <div
        class="p-8 mb-12 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 md:p-12 rounded-2xl animate-slide-up"
      >
        <div class="max-w-4xl mx-auto">
          <h2 class="mb-8 text-3xl font-bold text-center text-gray-800 sm:text-4xl">
            Tentang Penulis
          </h2>
          <div class="flex flex-col items-center md:flex-row md:items-start">
            <!-- Avatar -->
            <div class="mb-6 md:mb-0 md:mr-8">
              <div
                class="flex items-center justify-center w-32 h-32 text-6xl text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl"
              >
                👨‍💻
              </div>
            </div>
            <!-- Info -->
            <div class="flex-1 text-center md:text-left">
              <h3 class="mb-2 text-2xl font-bold text-gray-800">Muhammad Wildan</h3>
              <p class="mb-4 text-lg font-medium text-indigo-600">
                Fullstack Developer & Content Creator
              </p>
              <p class="mb-4 leading-relaxed text-gray-700">
                Halo! Saya seorang developer yang passionate tentang teknologi dan berbagi
                pengetahuan. MyBlog adalah wadah untuk menuangkan ide, pengalaman, dan informasi
                menarik yang semoga bermanfaat untuk banyak orang.
              </p>
              <p class="leading-relaxed text-gray-700">
                Selain coding, saya juga suka eksplorasi topik-topik menarik lainnya seperti
                otomotif, kuliner, dan berbagai hal yang membuat hidup lebih berwarna. Mari belajar
                dan berkembang bersama! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Community -->
      <div class="p-8 mb-12 bg-white shadow-lg md:p-12 rounded-2xl animate-slide-up">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl">Mari Terhubung!</h2>
          <p class="mb-8 text-lg text-gray-600">
            Follow dan connect dengan saya di berbagai platform
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <!-- GitHub -->
            <a
              href="https://github.com/wildan-se"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-6 py-3 space-x-3 text-white transition-all duration-300 transform bg-gray-800 rounded-lg shadow-md hover:bg-gray-900 hover:scale-105 hover:shadow-xl"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span class="font-semibold">GitHub</span>
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/wlse._/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-6 py-3 space-x-3 text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-xl"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span class="font-semibold">Instagram</span>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/muhammadwildanseptiano/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-6 py-3 space-x-3 text-white transition-all duration-300 transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
              <span class="font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <!-- FAQ with Accordion -->
      <div class="p-8 mb-12 bg-white shadow-lg md:p-12 rounded-2xl animate-slide-up">
        <div class="max-w-4xl mx-auto">
          <h2 class="mb-8 text-3xl font-bold text-center text-gray-800 sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div class="space-y-4">
            <!-- FAQ 1 -->
            <div
              class="overflow-hidden transition-all duration-300 border-2 border-gray-200 rounded-lg hover:border-indigo-300"
            >
              <button
                @click="toggleFaq(0)"
                class="flex items-center justify-between w-full p-6 text-left transition-colors duration-200 bg-white hover:bg-gray-50"
              >
                <h3 class="text-lg font-semibold text-gray-800 sm:text-xl">
                  Apakah semua konten di MyBlog gratis?
                </h3>
                <svg
                  :class="{ 'rotate-180': openFaq === 0 }"
                  class="w-6 h-6 text-indigo-600 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <transition name="accordion">
                <div v-show="openFaq === 0" class="px-6 pb-6">
                  <div class="pt-4 border-t border-gray-200">
                    <p class="leading-relaxed text-gray-600">
                      Ya! Semua artikel dan konten di MyBlog 100% gratis untuk dibaca dan
                      dibagikan. Kami percaya bahwa pengetahuan harus dapat diakses oleh semua
                      orang tanpa hambatan biaya.
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <!-- FAQ 2 -->
            <div
              class="overflow-hidden transition-all duration-300 border-2 border-gray-200 rounded-lg hover:border-purple-300"
            >
              <button
                @click="toggleFaq(1)"
                class="flex items-center justify-between w-full p-6 text-left transition-colors duration-200 bg-white hover:bg-gray-50"
              >
                <h3 class="text-lg font-semibold text-gray-800 sm:text-xl">
                  Seberapa sering konten diupdate?
                </h3>
                <svg
                  :class="{ 'rotate-180': openFaq === 1 }"
                  class="w-6 h-6 text-purple-600 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <transition name="accordion">
                <div v-show="openFaq === 1" class="px-6 pb-6">
                  <div class="pt-4 border-t border-gray-200">
                    <p class="leading-relaxed text-gray-600">
                      Kami berusaha untuk publish artikel baru minimal 2-3 kali seminggu dengan
                      topik yang beragam dan menarik. Setiap artikel ditulis dengan riset yang
                      mendalam untuk memastikan kualitas dan relevansi.
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <!-- FAQ 3 -->
            <div
              class="overflow-hidden transition-all duration-300 border-2 border-gray-200 rounded-lg hover:border-pink-300"
            >
              <button
                @click="toggleFaq(2)"
                class="flex items-center justify-between w-full p-6 text-left transition-colors duration-200 bg-white hover:bg-gray-50"
              >
                <h3 class="text-lg font-semibold text-gray-800 sm:text-xl">
                  Bisa request topik artikel?
                </h3>
                <svg
                  :class="{ 'rotate-180': openFaq === 2 }"
                  class="w-6 h-6 text-pink-600 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <transition name="accordion">
                <div v-show="openFaq === 2" class="px-6 pb-6">
                  <div class="pt-4 border-t border-gray-200">
                    <p class="leading-relaxed text-gray-600">
                      Tentu saja! Kami sangat terbuka dengan saran topik. Silakan hubungi kami
                      melalui email atau social media. Setiap saran akan kami pertimbangkan dan
                      prioritaskan berdasarkan kebutuhan pembaca.
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="p-8 text-center shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 md:p-12 rounded-2xl animate-slide-up"
      >
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Siap Untuk Mulai Membaca?</h2>
        <p class="max-w-2xl mx-auto mb-8 text-lg text-white opacity-90">
          Jelajahi berbagai artikel menarik dan bermanfaat yang telah kami siapkan untuk Anda
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/"
            class="inline-flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-indigo-600 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Lihat Artikel Terbaru</span>
          </router-link>

          <a
            href="mailto:awkwok09@gmail.com"
            class="inline-flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white transition-all duration-300 transform border-2 border-white rounded-lg shadow-lg hover:bg-white hover:text-indigo-600 hover:scale-105 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Hubungi Kami</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      openFaq: null, // Track which FAQ is currently open
    }
  },
  methods: {
    toggleFaq(index) {
      // If clicking the same FAQ, close it. Otherwise, open the clicked one
      this.openFaq = this.openFaq === index ? null : index
    },
  },
}
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-slide-up:nth-child(2) {
  animation-delay: 0.2s;
}

.animate-slide-up:nth-child(3) {
  animation-delay: 0.4s;
}

.animate-slide-up:nth-child(4) {
  animation-delay: 0.6s;
}

.animate-slide-up:nth-child(5) {
  animation-delay: 0.8s;
}

.animate-slide-up:nth-child(6) {
  animation-delay: 1s;
}

.animate-slide-up:nth-child(7) {
  animation-delay: 1.2s;
}

.animate-slide-up:nth-child(8) {
  animation-delay: 1.4s;
}

/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
