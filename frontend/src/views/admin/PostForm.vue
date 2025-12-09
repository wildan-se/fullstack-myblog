<template>
  <div class="p-6 bg-white shadow-md post-form rounded-xl">
    <!-- Auto-Save Indicator -->
    <div v-if="lastAutoSaved" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
      <span class="text-sm text-green-700 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        💾 Auto-saved at {{ lastAutoSaved }}
      </span>
      <button
        v-if="hasSavedDraft"
        @click="restoreDraft"
        type="button"
        class="text-sm text-green-600 hover:text-green-800 font-medium"
      >
        Restore Draft
      </button>
    </div>

    <h2 class="mb-6 text-3xl font-bold text-gray-800">
      {{ isEditing ? 'Edit Postingan' : 'Buat Postingan Baru' }}
    </h2>

    <form @submit.prevent="submitPost">
      <!-- Title -->
      <div class="mb-4">
        <label for="title" class="block mb-1 text-sm font-medium text-gray-700">Judul:</label>
        <input
          type="text"
          id="title"
          v-model="post.title"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label for="category" class="block mb-1 text-sm font-medium text-gray-700">Kategori:</label>
        <select
          id="category"
          v-model="post.category"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Pilih Kategori</option>
          <option v-for="cat in allCategories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>
        <p v-if="categoriesLoading" class="mt-1 text-sm text-gray-500">Memuat kategori...</p>
        <p v-if="categoriesError" class="mt-1 text-sm text-red-500">
          Gagal memuat kategori: {{ categoriesError }}
        </p>
      </div>

      <!-- Image Upload -->
      <div class="mb-4">
        <label for="imageUpload" class="block mb-1 text-sm font-medium text-gray-700">Upload Gambar:</label>
        <input
          type="file"
          id="imageUpload"
          @change="handleFileChange"
          accept="image/*"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p class="mt-1 text-xs text-gray-500">Pilih file gambar (JPG, PNG, GIF, WEBP, maks 5MB).</p>

        <div v-if="imagePreviewUrl" class="mt-4">
          <p class="mb-2 text-sm font-medium text-gray-700">Pratinjau Gambar:</p>
          <img
            :src="imagePreviewUrl"
            alt="Pratinjau Gambar"
            class="h-auto max-w-xs border border-gray-200 rounded-lg shadow-md"
          />
          <button
            @click="removeImage"
            type="button"
            class="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Hapus Gambar
          </button>
        </div>
        <div
          v-else-if="post.image && post.image !== '/uploads/default-post.jpg' && !selectedFile"
          class="mt-4"
        >
          <p class="mb-2 text-sm font-medium text-gray-700">Gambar Saat Ini:</p>
          <img
            :src="post.image"
            alt="Gambar Postingan Saat Ini"
            class="h-auto max-w-xs border border-gray-200 rounded-lg shadow-md"
          />
          <button
            @click="removeImage"
            type="button"
            class="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Hapus Gambar
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="mb-4">
        <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Konten Postingan:</label>
        <RichTextEditor
          v-model="post.content"
          placeholder="Tulis konten blog Anda di sini... Gunakan toolbar untuk formatting."
          height="500px"
        />
        <p class="mt-2 text-xs text-gray-500">
          Gunakan toolbar di atas untuk memformat teks, menambahkan gambar, link, dan lainnya.
        </p>
      </div>

      <!-- SEO Section -->
      <div class="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 class="mb-4 text-lg font-semibold text-gray-800 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          SEO Settings
        </h3>

        <!-- SEO Title -->
        <div class="mb-4">
          <label for="seoTitle" class="block mb-1 text-sm font-medium text-gray-700">
            SEO Title (Optional):
          </label>
          <input
            type="text"
            id="seoTitle"
            v-model="post.seoTitle"
            maxlength="60"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave blank to use post title"
          />
          <p class="mt-1 text-xs text-gray-500">
            {{ post.seoTitle ? post.seoTitle.length : 0 }}/60 characters
            <span v-if="post.seoTitle && post.seoTitle.length > 60" class="text-red-500">
              (Too long!)
            </span>
          </p>
        </div>

        <!-- Meta Description -->
        <div class="mb-4">
          <label for="metaDescription" class="block mb-1 text-sm font-medium text-gray-700">
            Meta Description:
          </label>
          <textarea
            id="metaDescription"
            v-model="post.metaDescription"
            rows="3"
            maxlength="160"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief description for search engines (recommended 150-160 characters)"
          ></textarea>
          <p class="mt-1 text-xs text-gray-500">
            {{ post.metaDescription ? post.metaDescription.length : 0 }}/160 characters
            <span v-if="post.metaDescription && post.metaDescription.length > 160" class="text-red-500">
              (Too long!)
            </span>
          </p>
        </div>

        <!-- Focus Keyword -->
        <div class="mb-4">
          <label for="focusKeyword" class="block mb-1 text-sm font-medium text-gray-700">
            Focus Keyword:
          </label>
          <input
            type="text"
            id="focusKeyword"
            v-model="post.focusKeyword"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., vue.js tutorial"
          />
          <p class="mt-1 text-xs text-gray-500">
            Main keyword you want to rank for in search engines
          </p>
        </div>

        <!-- Tags -->
        <div class="mb-4">
          <label for="tags" class="block mb-1 text-sm font-medium text-gray-700">
            Tags (comma separated):
          </label>
          <input
            type="text"
            id="tags"
            v-model="tagsInput"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="vue, javascript, tutorial, web development"
          />
          <p class="mt-1 text-xs text-gray-500">
            Separate tags with commas. Example: vue, javascript, tutorial
          </p>
          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Status:</label>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="text-indigo-600 form-radio"
              name="status"
              value="draft"
              v-model="post.status"
            />
            <span class="ml-2 text-gray-700">Draf</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="text-indigo-600 form-radio"
              name="status"
              value="published"
              v-model="post.status"
            />
            <span class="ml-2 text-gray-700">Diterbitkan</span>
          </label>
        </div>
      </div>

      <!-- Error Display -->
      <div
        v-if="postsError"
        class="relative px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
      >
        <span class="block sm:inline">Terjadi kesalahan: {{ postsError }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="$router.push('/admin/posts')"
          class="px-6 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="postsLoading"
          class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="postsLoading">Menyimpan...</span>
          <span v-else>{{ isEditing ? 'Perbarui Postingan' : 'Buat Postingan' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { useToast } from 'vue-toastification'
import RichTextEditor from '@/components/RichTextEditor.vue'

export default {
  name: 'PostForm',
  components: {
    RichTextEditor,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      post: {
        title: '',
        content: '',
        category: '',
        image: '',
        status: 'draft',
        seoTitle: '',
        metaDescription: '',
        focusKeyword: '',
        tags: [],
      },
      tagsInput: '',
      isEditing: false,
      selectedFile: null,
      imagePreviewUrl: null,
      lastAutoSaved: null,
      hasSavedDraft: false,
      autoSaveTimer: null,
    }
  },
  computed: {
    ...mapGetters('posts', ['postsLoading', 'postsError', 'postDetail']),
    ...mapGetters('categories', ['allCategories', 'categoriesLoading', 'categoriesError']),
  },
  watch: {
    'post.title': {
      handler() {
        this.scheduleAutoSave()
      },
      deep: true,
    },
    'post.content': {
      handler() {
        this.scheduleAutoSave()
      },
      deep: true,
    },
    tagsInput(newVal) {
      if (newVal) {
        this.post.tags = newVal.split(',').map((tag) => tag.trim()).filter((tag) => tag)
      } else {
        this.post.tags = []
      }
    },
  },
  async created() {
    await this.fetchCategories()
    if (this.id) {
      this.isEditing = true
      await this.fetchPostById(this.id)
      if (this.postDetail) {
        this.post.title = this.postDetail.title
        this.post.content = this.postDetail.content
        this.post.category = this.postDetail.category ? this.postDetail.category._id : ''
        this.post.image = this.postDetail.image
        this.post.status = this.postDetail.status
        this.post.seoTitle = this.postDetail.seoTitle || ''
        this.post.metaDescription = this.postDetail.metaDescription || ''
        this.post.focusKeyword = this.postDetail.focusKeyword || ''
        this.post.tags = this.postDetail.tags || []
        this.tagsInput = this.post.tags.join(', ')
        this.imagePreviewUrl = this.post.image
      }
    } else {
      this.isEditing = false
      this.checkForSavedDraft()
    }
  },
  beforeUnmount() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer)
    }
    if (this.imagePreviewUrl && this.selectedFile) {
      URL.revokeObjectURL(this.imagePreviewUrl)
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'updatePost', 'fetchPostById', 'uploadImage']),
    ...mapActions('categories', ['fetchCategories']),

    handleFileChange(event) {
      const file = event.target.files?.[0]
      if (file) {
        this.selectedFile = file
        this.imagePreviewUrl = URL.createObjectURL(file)
      } else {
        this.selectedFile = null
        this.imagePreviewUrl = null
        if (!this.post.image || this.post.image === '/uploads/default-post.jpg') {
          this.post.image = '/uploads/default-post.jpg'
        }
      }
    },

    removeImage() {
      this.selectedFile = null
      this.imagePreviewUrl = null
      this.post.image = '/uploads/default-post.jpg'
      const fileInput = document.getElementById('imageUpload')
      if (fileInput) {
        fileInput.value = ''
      }
    },

    scheduleAutoSave() {
      if (this.autoSaveTimer) {
        clearTimeout(this.autoSaveTimer)
      }
      this.autoSaveTimer = setTimeout(() => {
        this.autoSaveDraft()
      }, 30000) // 30 seconds
    },

    autoSaveDraft() {
      if (!this.isEditing && this.post.title && this.post.content) {
        const draftKey = 'post_draft_' + (this.id || 'new')
        localStorage.setItem(draftKey, JSON.stringify(this.post))
        const now = new Date()
        this.lastAutoSaved = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        this.hasSavedDraft = true
      }
    },

    checkForSavedDraft() {
      const draftKey = 'post_draft_new'
      const saved = localStorage.getItem(draftKey)
      if (saved) {
        this.hasSavedDraft = true
        const savedData = JSON.parse(saved)
        const savedTime = new Date(savedData.savedAt || Date.now())
        this.lastAutoSaved = savedTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    },

    restoreDraft() {
      const draftKey = 'post_draft_' + (this.id || 'new')
      const saved = localStorage.getItem(draftKey)
      if (saved) {
        const savedPost = JSON.parse(saved)
        this.post = { ...this.post, ...savedPost }
        this.tagsInput = this.post.tags ? this.post.tags.join(', ') : ''
        this.toast.success('Draft restored!')
      }
    },

    async submitPost() {
      if (!this.post.title.trim() || !this.post.content.trim() || !this.post.category) {
        this.toast.error('Judul, konten, dan kategori wajib diisi.')
        return
      }

      try {
        if (this.selectedFile) {
          const uploadedImagePath = await this.uploadImage(this.selectedFile)
          this.post.image = uploadedImagePath
        } else if (!this.post.image || this.post.image.includes('default-post.jpg')) {
          this.post.image = '/uploads/default-post.jpg'
        }

        if (this.isEditing) {
          await this.updatePost({ id: this.id, postData: this.post })
          this.toast.success('Postingan berhasil diperbarui!')
        } else {
          await this.createPost(this.post)
          this.toast.success('Postingan berhasil dibuat!')
          // Clear auto-saved draft
          localStorage.removeItem('post_draft_new')
        }

        this.$router.push('/admin/posts')
      } catch (error) {
        console.error('Error saving post:', error)
        this.toast.error(
          'Gagal menyimpan postingan: ' + (this.postsError || 'Terjadi kesalahan tidak dikenal.'),
        )
      }
    },
  },
}
</script>
