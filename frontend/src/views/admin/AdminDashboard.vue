<template>
  <div class="container p-4 mx-auto bg-white shadow-lg admin-dashboard rounded-xl">
    <h1 class="mb-8 text-4xl font-bold text-center text-gray-800">Panel Admin</h1>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <router-link
        to="/admin/posts"
        class="block p-6 text-center transition-shadow duration-300 bg-indigo-100 rounded-lg shadow-md hover:shadow-xl"
      >
        <div class="mb-4 text-5xl text-indigo-700">✍️</div>
        <h2 class="text-2xl font-semibold text-indigo-800">Manajemen Postingan</h2>
        <p class="mt-2 text-gray-600">Kelola semua postingan blog Anda.</p>
      </router-link>

      <router-link
        to="/admin/categories"
        class="block p-6 text-center transition-shadow duration-300 bg-green-100 rounded-lg shadow-md hover:shadow-xl"
      >
        <div class="mb-4 text-5xl text-green-700">📂</div>
        <h2 class="text-2xl font-semibold text-green-800">Manajemen Kategori</h2>
        <p class="mt-2 text-gray-600">Atur kategori untuk postingan Anda.</p>
      </router-link>

      <div
        class="block p-6 text-center transition-shadow duration-300 bg-yellow-100 rounded-lg shadow-md cursor-not-allowed hover:shadow-xl opacity-70"
      >
        <div class="mb-4 text-5xl text-yellow-700">📊</div>
        <h2 class="text-2xl font-semibold text-yellow-800">Statistik (Segera Hadir)</h2>
        <p class="mt-2 text-gray-600">Lihat statistik dan analitik blog Anda.</p>
      </div>
    </div>

    <div class="mt-12">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
}
</script>
