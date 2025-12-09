<template>
  <div class="p-6 bg-white shadow-md post-management rounded-xl">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">Manajemen Postingan</h2>

    <!-- Header Actions -->
    <div class="flex flex-wrap items-center justify-between mb-6 gap-4">
      <router-link
        to="/admin/posts/new"
        class="flex items-center px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Buat Postingan Baru
      </router-link>

      <!-- Advanced Filters -->
      <div class="flex flex-wrap gap-2">
        <!-- Search -->
        <input
          type="text"
          v-model="searchKeyword"
          @input="debouncedFetchPosts"
          placeholder="Cari postingan..."
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        
        <!-- Category Filter -->
        <select
          v-model="categoryFilter"
          @change="fetchPostsWithFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Semua Kategori</option>
          <option v-for="cat in allCategories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>
        
        <!-- Status Filter -->
        <select
          v-model="postStatusFilter"
          @change="fetchPostsWithFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Semua Status</option>
          <option value="published">Diterbitkan</option>
          <option value="draft">Draf</option>
        </select>
        
        <!-- Sort Options -->
        <select
          v-model="sortBy"
          @change="fetchPostsWithFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="title">Judul A-Z</option>
          <option value="views">Paling Banyak Dilihat</option>
        </select>
        
        <!-- Clear Filters Button -->
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Bulk Actions Bar -->
    <div
      v-if="selectedPosts.length > 0"
      class="flex items-center justify-between p-4 mb-4 bg-indigo-50 border border-indigo-200 rounded-lg"
    >
      <span class="text-sm font-medium text-indigo-700">
        {{ selectedPosts.length }} postingan dipilih
      </span>
      <div class="flex gap-2">
        <button
          @click="handleBulkAction('publish')"
          class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          ✅ Publish
        </button>
        <button
          @click="handleBulkAction('draft')"
          class="px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          📄 Set Draft
        </button>
        <button
          @click="handleBulkAction('delete')"
          class="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          🗑️ Hapus
        </button>
        <button
          @click="clearSelection"
          class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="postsLoading" class="py-12 text-center text-gray-600">
      <p>Memuat postingan...</p>
      <div class="w-10 h-10 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="postsError" class="py-6 text-center text-red-600">
      <p>Terjadi kesalahan: {{ postsError }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="allPosts.length === 0" class="py-12 text-center text-gray-500">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="text-lg font-medium">Belum ada postingan yang ditemukan.</p>
      <router-link
        to="/admin/posts/new"
        class="inline-block px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Buat Postingan Pertama
      </router-link>
    </div>

    <!-- Posts Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <!-- Select All Checkbox -->
            <th scope="col" class="px-3 py-3 text-left">
              <input
                type="checkbox"
                v-model="selectAll"
                @change="toggleSelectAll"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </th>
            <!-- Image -->
            <th scope="col" class="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Gambar
            </th>
            <!-- Title -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Judul
            </th>
            <!-- Category -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Kategori
            </th>
            <!-- Author -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Penulis
            </th>
            <!-- Status -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <!-- Statistics -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Statistik
            </th>
            <!-- Date -->
            <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Tanggal
            </th>
            <!-- Actions -->
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in allPosts" :key="post._id" class="hover:bg-gray-50">
            <!-- Checkbox -->
            <td class="px-3 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                :value="post._id"
                v-model="selectedPosts"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </td>

            <!-- Image Preview -->
            <td class="px-3 py-4 whitespace-nowrap">
              <img
                :src="post.image"
                :alt="post.title"
                class="object-cover w-16 h-16 rounded-lg"
                @error="handleImageError"
              />
            </td>

            <!-- Title -->
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              <div class="max-w-xs truncate">{{ post.title }}</div>
            </td>

            <!-- Category -->
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ post.category ? post.category.name : 'N/A' }}
            </td>

            <!-- Author -->
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ post.author ? post.author.name : 'N/A' }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <span
                :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-yellow-100 text-yellow-800': post.status === 'draft',
                }"
              >
                {{ post.status === 'published' ? 'Diterbitkan' : 'Draf' }}
              </span>
            </td>

            <!-- Statistics -->
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              <div class="flex flex-col gap-1">
                <span class="flex items-center gap-1" :title="`${post.views || 0} views`">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ formatNumber(post.views || 0) }}
                </span>
                <span class="flex items-center gap-1" :title="`${post.commentsCount || 0} comments`">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {{ post.commentsCount || 0 }}
                </span>
                <span class="flex items-center gap-1" :title="`${post.likes || 0} likes`">
                  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ post.likes || 0 }}
                </span>
              </div>
            </td>

            <!-- Date -->
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ new Date(post.createdAt).toLocaleDateString('id-ID') }}
            </td>

            <!-- Quick Actions -->
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <div class="relative inline-block text-left">
                <button
                  @click="toggleQuickActions(post._id)"
                  class="p-2 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                <!-- Quick Actions Dropdown -->
                <div
                  v-if="activeQuickMenu === post._id"
                  class="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <button
                      v-if="post.status === 'draft'"
                      @click="quickPublish(post._id)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Quick Publish
                    </button>
                    <button
                      v-if="post.status === 'published'"
                      @click="quickDraft(post._id)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Set as Draft
                    </button>
                    <router-link
                      :to="`/admin/posts/edit/${post._id}`"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </router-link>
                    <button
                      @click="confirmDelete(post._id)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="postsPagination.pages > 1" class="flex items-center justify-center mt-8 space-x-3">
      <button
        @click="changePage(postsPagination.page - 1)"
        :disabled="postsPagination.page === 1 || postsLoading"
        class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      <span class="text-gray-700">
        Halaman {{ postsPagination.page }} dari {{ postsPagination.pages }}
      </span>
      <button
        @click="changePage(postsPagination.page + 1)"
        :disabled="postsPagination.page === postsPagination.pages || postsLoading"
        class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Berikutnya
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showConfirmModal = false"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">{{ confirmTitle }}</h3>
        <p class="mb-6 text-gray-600">{{ confirmMessage }}</p>
        <div class="flex justify-end gap-3">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            @click="executeConfirmedAction"
            class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            {{ confirmButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import { useToast } from 'vue-toastification'

export default {
  name: 'PostManagement',
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      searchKeyword: '',
      postStatusFilter: '',
      categoryFilter: '',
      sortBy: 'newest',
      selectedPosts: [],
      selectAll: false,
      activeQuickMenu: null,
      showConfirmModal: false,
      confirmTitle: '',
      confirmMessage: '',
      confirmButton: 'Konfirmasi',
      confirmedAction: null,
    }
  },
  computed: {
    ...mapGetters('posts', ['allPosts', 'postsPagination', 'postsLoading', 'postsError']),
    ...mapGetters('categories', ['allCategories']),
    hasActiveFilters() {
      return this.searchKeyword || this.postStatusFilter || this.categoryFilter || this.sortBy !== 'newest'
    },
  },
  created() {
    this.fetchCategories()
    this.fetchPostsWithFilter()
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeQuickActions)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeQuickActions)
  },
  methods: {
    ...mapActions('posts', ['fetchPosts', 'deletePost', 'bulkAction', 'updatePost']),
    ...mapActions('categories', ['fetchCategories']),

    debouncedFetchPosts: debounce(function () {
      this.fetchPostsWithFilter()
    }, 500),

    fetchPostsWithFilter() {
      const page = this.postsPagination.page || 1
      // Note: Backend needs to support category and sort filters
      // For now, we'll filter client-side for sort
      this.fetchPosts({
        page,
        keyword: this.searchKeyword,
        status: this.postStatusFilter,
        category: this.categoryFilter,
      })
      this.clearSelection()
      this.applySorting()
    },

    applySorting() {
      // Client-side sorting (can be moved to backend for better performance)
      if (this.sortBy === 'title') {
        this.allPosts.sort((a, b) => a.title.localeCompare(b.title))
      } else if (this.sortBy === 'views') {
        this.allPosts.sort((a, b) => (b.views || 0) - (a.views || 0))
      } else if (this.sortBy === 'oldest') {
        this.allPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      }
      // 'newest' is default from backend
    },

    clearFilters() {
      this.searchKeyword = ''
      this.postStatusFilter = ''
      this.categoryFilter = ''
      this.sortBy = 'newest'
      this.fetchPostsWithFilter()
    },

    changePage(page) {
      if (page >= 1 && page <= this.postsPagination.pages) {
        this.fetchPosts({
          page,
          keyword: this.searchKeyword,
          status: this.postStatusFilter,
        })
        this.clearSelection()
      }
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedPosts = this.allPosts.map((post) => post._id)
      } else {
        this.selectedPosts = []
      }
    },

    clearSelection() {
      this.selectedPosts = []
      this.selectAll = false
    },

    async handleBulkAction(action) {
      const actionNames = {
        delete: 'menghapus',
        publish: 'mempublikasikan',
        draft: 'mengubah menjadi draft',
      }

      this.confirmTitle = `Konfirmasi ${actionNames[action]}`
      this.confirmMessage = `Apakah Anda yakin ingin ${actionNames[action]} ${this.selectedPosts.length} postingan?`
      this.confirmButton = action === 'delete' ? 'Hapus' : 'Ya, Lanjutkan'
      this.confirmedAction = async () => {
        try {
          const result = await this.bulkAction({ action, postIds: this.selectedPosts })
          this.toast.success(result.message)
          this.clearSelection()
          this.fetchPostsWithFilter()
        } catch (error) {
          this.toast.error(error || 'Gagal melakukan bulk action')
        }
      }
      this.showConfirmModal = true
    },

    toggleQuickActions(postId) {
      this.activeQuickMenu = this.activeQuickMenu === postId ? null : postId
    },

    closeQuickActions(event) {
      if (!event.target.closest('.relative')) {
        this.activeQuickMenu = null
      }
    },

    async quickPublish(postId) {
      try {
        await this.bulkAction({ action: 'publish', postIds: [postId] })
        this.toast.success('Postingan berhasil dipublikasikan!')
        this.fetchPostsWithFilter()
      } catch (error) {
        this.toast.error(error || 'Gagal mempublikasikan postingan')
      }
      this.activeQuickMenu = null
    },

    async quickDraft(postId) {
      try {
        await this.bulkAction({ action: 'draft', postIds: [postId] })
        this.toast.success('Postingan berhasil dijadikan draft!')
        this.fetchPostsWithFilter()
      } catch (error) {
        this.toast.error(error || 'Gagal mengubah status postingan')
      }
      this.activeQuickMenu = null
    },

    confirmDelete(postId) {
      this.confirmTitle = 'Konfirmasi Hapus'
      this.confirmMessage = 'Apakah Anda yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan.'
      this.confirmButton = 'Hapus'
      this.confirmedAction = async () => {
        try {
          await this.deletePost(postId)
          this.toast.success('Postingan berhasil dihapus!')
          this.fetchPostsWithFilter()
        } catch (error) {
          this.toast.error(error || 'Gagal menghapus postingan')
        }
      }
      this.showConfirmModal = true
      this.activeQuickMenu = null
    },

    executeConfirmedAction() {
      if (this.confirmedAction) {
        this.confirmedAction()
      }
      this.showConfirmModal = false
      this.confirmedAction = null
    },

    handleImageError(event) {
      event.target.src = '/uploads/default-post.jpg'
    },

    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num
    },
  },
}
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
