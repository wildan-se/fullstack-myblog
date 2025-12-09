<template>
  <div class="p-6 bg-white shadow-md category-management rounded-xl">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">Manajemen Kategori</h2>

    <!-- Formulir Tambah Kategori Baru -->
    <form @submit.prevent="addCategory" class="flex items-end mb-8 space-x-4">
      <div class="flex-grow">
        <label for="newCategoryName" class="block mb-2 text-sm font-medium text-gray-700"
          >Nama Kategori Baru:</label
        >
        <input
          type="text"
          id="newCategoryName"
          v-model="newCategoryName"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan nama kategori"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="categoriesLoading"
        class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="categoriesLoading">Menambahkan...</span>
        <span v-else>Tambah Kategori</span>
      </button>
    </form>

    <!-- Bulk Actions Bar -->
    <div
      v-if="selectedCategories.length > 0"
      class="flex items-center justify-between p-4 mb-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <span class="text-sm font-medium text-red-700">
        {{ selectedCategories.length }} kategori dipilih
      </span>
      <div class="flex gap-2">
        <button
          @click="handleBulkDelete"
          class="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          🗑️ Hapus Semua
        </button>
        <button
          @click="clearSelection"
          class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- Kondisi Tampilan Daftar Kategori (Loading, Error, No Data, Data Available) -->
    <div
      v-if="categoriesLoading && allCategories.length === 0"
      class="py-12 text-center text-gray-600"
    >
      <p>Memuat kategori...</p>
      <div
        class="w-10 h-10 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="categoriesError" class="py-6 text-center text-red-600">
      <p>Terjadi kesalahan: {{ categoriesError }}</p>
    </div>
    <div v-else-if="allCategories.length === 0" class="py-6 text-center text-gray-500">
      <p>Belum ada kategori.</p>
    </div>
    <ul v-else class="space-y-4">
      <li
        v-for="category in allCategories"
        :key="category._id"
        class="flex flex-col items-start justify-between p-4 rounded-lg shadow-sm sm:flex-row sm:items-center bg-gray-50"
      >
        <!-- Checkbox for bulk selection -->
        <div class="flex items-center w-full gap-3">
          <input
            type="checkbox"
            :value="category._id"
            v-model="selectedCategories"
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />

          <!-- Mode Tampilan Kategori (Saat Tidak Diedit) -->
          <template v-if="editingCategoryId !== category._id">
            <span class="flex-grow text-lg font-medium text-gray-800">{{ category.name }}</span>
            <div class="flex items-center mt-2 space-x-3 sm:mt-0">
              <button
                @click="startEdit(category)"
                class="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(category._id)"
                class="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Hapus
              </button>
            </div>
          </template>

          <!-- Mode Edit Kategori -->
          <template v-else>
            <div
              class="flex flex-col items-start flex-grow w-full sm:flex-row sm:items-center sm:space-x-4"
            >
              <input
                type="text"
                v-model="editingCategoryName"
                class="flex-grow w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:w-auto"
              />
              <div class="flex mt-2 space-x-2 sm:mt-0">
                <button
                  @click="saveEdit()"
                  :disabled="categoriesLoading || !editingCategoryName.trim()"
                  class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan
                </button>
                <button
                  @click="cancelEdit()"
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </template>
        </div>
      </li>
    </ul>

    <!-- Select All Checkbox -->
    <div v-if="allCategories.length > 0" class="mt-4">
      <label class="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          v-model="selectAll"
          @change="toggleSelectAll"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span>Pilih Semua ({{ allCategories.length }} kategori)</span>
      </label>
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
import { useToast } from 'vue-toastification'

export default {
  name: 'CategoryManagement',
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      newCategoryName: '',
      editingCategoryId: null,
      editingCategoryName: '',
      selectedCategories: [],
      selectAll: false,
      showConfirmModal: false,
      confirmTitle: '',
      confirmMessage: '',
      confirmButton: 'Konfirmasi',
      confirmedAction: null,
    }
  },
  computed: {
    ...mapGetters('categories', ['allCategories', 'categoriesLoading', 'categoriesError']),
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions('categories', [
      'fetchCategories',
      'createCategory',
      'updateCategory',
      'deleteCategory',
      'bulkDeleteCategories',
    ]),

    async addCategory() {
      if (!this.newCategoryName.trim()) {
        this.toast.error('Nama kategori tidak boleh kosong.')
        return
      }
      try {
        await this.createCategory(this.newCategoryName)
        this.toast.success('Kategori berhasil ditambahkan!')
        this.newCategoryName = ''
      } catch (error) {
        console.error('Error adding category:', error)
        this.toast.error('Gagal menambahkan kategori: ' + this.categoriesError)
      }
    },

    startEdit(category) {
      this.editingCategoryId = category._id
      this.editingCategoryName = category.name
    },

    cancelEdit() {
      this.editingCategoryId = null
      this.editingCategoryName = ''
    },

    async saveEdit() {
      if (!this.editingCategoryName.trim() || !this.editingCategoryId) {
        this.toast.error('Nama kategori tidak boleh kosong.')
        return
      }
      try {
        await this.updateCategory({
          id: this.editingCategoryId,
          name: this.editingCategoryName,
        })
        this.toast.success('Kategori berhasil diperbarui!')
        this.cancelEdit()
      } catch (error) {
        console.error('Error updating category:', error)
        this.toast.error('Gagal memperbarui kategori: ' + this.categoriesError)
      }
    },

    confirmDelete(categoryId) {
      this.confirmTitle = 'Konfirmasi Hapus'
      this.confirmMessage = 'Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.'
      this.confirmButton = 'Hapus'
      this.confirmedAction = async () => {
        try {
          await this.deleteCategory(categoryId)
          this.toast.info('Kategori berhasil dihapus!')
        } catch (error) {
          console.error('Error deleting category:', error)
          this.toast.error('Gagal menghapus kategori: ' + this.categoriesError)
        }
      }
      this.showConfirmModal = true
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedCategories = this.allCategories.map((cat) => cat._id)
      } else {
        this.selectedCategories = []
      }
    },

    clearSelection() {
      this.selectedCategories = []
      this.selectAll = false
    },

    handleBulkDelete() {
      this.confirmTitle = 'Konfirmasi Hapus Massal'
      this.confirmMessage = `Apakah Anda yakin ingin menghapus ${this.selectedCategories.length} kategori? Tindakan ini tidak dapat dibatalkan.`
      this.confirmButton = 'Hapus Semua'
      this.confirmedAction = async () => {
        try {
          const result = await this.bulkDeleteCategories(this.selectedCategories)
          this.toast.success(result.message)
          this.clearSelection()
        } catch (error) {
          console.error('Error bulk deleting categories:', error)
          this.toast.error('Gagal menghapus kategori: ' + this.categoriesError)
        }
      }
      this.showConfirmModal = true
    },

    executeConfirmedAction() {
      if (this.confirmedAction) {
        this.confirmedAction()
      }
      this.showConfirmModal = false
      this.confirmedAction = null
    },
  },
}
</script>
