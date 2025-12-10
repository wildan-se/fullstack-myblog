<template>
  <div class="container px-4 py-6 mx-auto post-detail sm:py-8 max-w-5xl">
    <div v-if="postsLoading" class="py-12 text-xl text-center text-gray-600">
      <p>Memuat postingan...</p>
      <div
        class="w-12 h-12 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="postsError" class="py-12 text-center text-red-600">
      <p class="text-lg sm:text-xl">Terjadi kesalahan saat memuat postingan: {{ postsError }}</p>
      <router-link to="/" class="inline-block mt-4 text-indigo-600 hover:underline"
        >Kembali ke Beranda</router-link
      >
    </div>

    <div
      v-else-if="postDetail"
      class="p-4 bg-white border border-gray-200 shadow-lg sm:p-6 lg:p-12 rounded-xl"
    >
      <!-- Image -->
      <div class="w-full mb-6 overflow-hidden bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-96 sm:mb-8">
        <img
          :src="postDetail.image"
          :alt="postDetail.title"
          class="object-cover w-full h-full"
          @error="handleImageError"
        />
      </div>

      <!-- Meta Info - Responsive Stack -->
      <div class="flex flex-col gap-3 mb-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:mb-4">
        <p class="flex-1">
          Oleh
          <span class="font-semibold text-indigo-700">{{
            postDetail.author?.name || 'Unknown'
          }}</span>
          pada
          {{
            new Date(postDetail.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </p>
        <span
          v-if="postDetail.category"
          class="inline-block px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full sm:text-sm w-fit"
          >{{ postDetail.category?.name || 'Uncategorized' }}</span
        >
      </div>

      <!-- Title - Responsive Size -->
      <h1 class="mb-4 text-2xl font-extrabold leading-tight text-gray-900 break-words sm:text-3xl lg:text-5xl sm:mb-6">
        {{ postDetail.title }}
      </h1>

      <!-- Post Statistics & Like Button - Responsive Layout -->
      <div class="flex flex-col gap-4 p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
        <!-- Stats - Stack on mobile, row on desktop -->
        <div class="flex flex-wrap items-center gap-3 text-xs text-gray-600 sm:gap-6 sm:text-sm">
          <!-- Views -->
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span class="font-medium">{{ postDetail.views || 0 }} views</span>
          </span>

          <!-- Comments -->
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span class="font-medium">{{ postComments.length }} comments</span>
          </span>

          <!-- Likes -->
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-red-500 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="font-medium">{{ postDetail.likes || 0 }} likes</span>
          </span>
        </div>

        <!-- Like Button - Full width on mobile -->
        <button
          @click="handleLike"
          :disabled="!isAuthenticated || liking"
          :class="[
            'flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto',
            hasLiked ? 'bg-pink-500 hover:bg-pink-600' : 'bg-red-500 hover:bg-red-600'
          ]"
          :title="!isAuthenticated ? 'Login untuk like' : (hasLiked ? 'Unlike post ini' : 'Like post ini')"
        >
          <svg 
            class="w-4 h-4 sm:w-5 sm:h-5" 
            :fill="hasLiked ? 'currentColor' : 'none'" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span v-if="liking">{{ hasLiked ? 'Unliking...' : 'Liking...' }}</span>
          <span v-else>{{ hasLiked ? 'Unlike' : 'Like' }}</span>
        </button>
      </div>

      <!-- Content - With proper word break -->
      <div
        class="text-base leading-relaxed prose text-gray-800 break-words sm:text-lg max-w-none"
        v-html="postDetail.content"
      ></div>

      <!-- Back Button -->
      <div class="mt-8 text-center sm:mt-12">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md sm:px-6 sm:py-3 sm:text-base hover:bg-indigo-700"
        >
          <svg
            class="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Kembali ke Beranda
        </router-link>
      </div>

      <!-- Comments Section -->
      <div class="pt-8 mt-12 border-t border-gray-300 sm:pt-10 sm:mt-16">
        <h2 class="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-6">Komentar ({{ postComments.length }})</h2>

        <div
          v-if="commentsLoading && postComments.length === 0"
          class="py-4 text-center text-gray-600"
        >
          Memuat komentar...
          <div
            class="w-8 h-8 mx-auto mt-2 border-b-2 border-indigo-400 rounded-full animate-spin"
          ></div>
        </div>
        <div v-else-if="commentsError" class="py-4 text-sm text-center text-red-600 sm:text-base">
          Gagal memuat komentar: {{ commentsError }}
        </div>
        <div v-else-if="postComments.length === 0" class="p-4 text-sm text-gray-700 rounded-lg sm:p-6 bg-gray-50 sm:text-base">
          <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </div>
        <div v-else class="space-y-4 sm:space-y-6">
          <div
            v-for="comment in postComments"
            :key="comment._id"
            class="p-3 rounded-lg shadow-sm sm:p-4 bg-gray-50"
          >
            <template v-if="editingCommentId !== comment._id">
              <div class="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center">
                <p class="text-sm font-semibold text-gray-800 sm:text-base">{{ comment.user?.name || 'Unknown' }}</p>
                <span class="text-xs text-gray-500 sm:ml-auto">
                  {{
                    new Date(comment.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}
                </span>
              </div>
              <p class="text-sm text-gray-700 break-words sm:text-base">{{ comment.content }}</p>

              <div
                v-if="
                  isAuthenticated &&
                  currentUser &&
                  comment.user &&
                  (currentUser._id === comment.user._id || isAdmin)
                "
                class="flex justify-end mt-3 space-x-3"
              >
                <button
                  @click="startEditComment(comment)"
                  class="text-xs font-medium text-blue-600 sm:text-sm hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  @click="confirmDeleteComment(comment._id)"
                  class="text-xs font-medium text-red-600 sm:text-sm hover:text-red-800"
                >
                  Hapus
                </button>
              </div>
            </template>

            <template v-else>
              <div class="mb-2">
                <label :for="`editComment-${comment._id}`" class="sr-only">Edit Komentar:</label>
                <textarea
                  :id="`editComment-${comment._id}`"
                  v-model="editingCommentContent"
                  rows="3"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm sm:px-4 sm:text-base focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div class="flex justify-end space-x-2 sm:space-x-3">
                <button
                  @click="cancelEditComment()"
                  class="px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:text-sm hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  @click="saveEditedComment(comment._id)"
                  :disabled="!editingCommentContent.trim() || commentsLoading"
                  class="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg shadow-md sm:px-4 sm:py-2 sm:text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan
                </button>
              </div>
              <p v-if="commentsError" class="mt-2 text-xs text-red-600 sm:text-sm sm:mt-3">
                Gagal menyimpan perubahan: {{ commentsError }}
              </p>
            </template>
          </div>
        </div>

        <!-- Add Comment Form -->
        <div class="p-4 mt-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 sm:mt-8">
          <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">Tambahkan Komentar</h3>
          <p v-if="!isAuthenticated" class="mb-3 text-xs text-red-500 sm:text-sm sm:mb-4">
            Anda harus
            <router-link to="/login" class="text-indigo-600 hover:underline">login</router-link>
            untuk berkomentar.
          </p>
          <form @submit.prevent="submitComment">
            <div class="mb-3 sm:mb-4">
              <label for="commentContent" class="sr-only">Komentar Anda:</label>
              <textarea
                id="commentContent"
                v-model="newCommentContent"
                rows="4"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm sm:px-4 sm:text-base focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tulis komentar Anda di sini..."
                :disabled="!isAuthenticated || commentsLoading"
                required
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="!isAuthenticated || commentsLoading || !newCommentContent.trim()"
                class="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md sm:w-auto sm:px-6 sm:text-base hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="commentsLoading">Mengirim...</span>
                <span v-else>Kirim Komentar</span>
              </button>
            </div>
            <p v-if="commentsError" class="mt-2 text-xs text-red-600 sm:text-sm sm:mt-3">
              Gagal mengirim komentar: {{ commentsError }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { useToast } from 'vue-toastification' // Impor useToast
// Tidak perlu lagi mengimpor ConfirmationToast karena kita tidak menggunakannya untuk confirm()
// import ConfirmationToast from '@/components/ConfirmationToast.vue';

export default {
  name: 'PostDetailView',
  props: ['slug'],
  // Menggunakan setup() hook untuk mendapatkan instance toast
  setup() {
    const toast = useToast()
    return { toast } // Mengembalikan instance toast agar dapat diakses oleh Options API
  },
  data() {
    return {
      newCommentContent: '',
      editingCommentId: null,
      editingCommentContent: '',
      liking: false,
      hasLiked: false,
    }
  },
  computed: {
    ...mapGetters('posts', ['postDetail', 'postsLoading', 'postsError']),
    ...mapGetters('comments', ['postComments', 'commentsLoading', 'commentsError']),
    ...mapGetters('auth', ['isAuthenticated', 'currentUser', 'isAdmin']),
  },
  async created() {
    // Fetches post details based on the slug from the URL.
    await this.fetchPostBySlug(this.slug)

    // If post details are successfully loaded, then fetch comments for that post.
    if (this.postDetail) {
      this.fetchCommentsForPost(this.postDetail._id)
      
      // Auto-increment views
      this.incrementPostView()
      
      // Check if user has liked this post (from localStorage)
      this.checkIfLiked()
    }
  },
  methods: {
    ...mapActions('posts', ['fetchPostBySlug', 'incrementView', 'likePost']),
    ...mapActions('comments', [
      'fetchCommentsForPost',
      'addComment',
      'updateComment',
      'deleteComment',
    ]),

    async incrementPostView() {
      if (this.postDetail && this.postDetail._id) {
        try {
          await this.incrementView(this.postDetail._id)
        } catch (error) {
          console.error('Error incrementing view:', error)
        }
      }
    },

    checkIfLiked() {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
      this.hasLiked = likedPosts.includes(this.postDetail._id)
    },

    async handleLike() {
      if (!this.isAuthenticated || !this.postDetail) {
        this.toast.error('Anda harus login untuk like postingan')
        return
      }

      this.liking = true
      const action = this.hasLiked ? 'unlike' : 'like'
      
      try {
        await this.likePost({ 
          postId: this.postDetail._id,
          action: action
        })
        
        // Update localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
        
        if (action === 'like') {
          // Add to liked posts
          if (!likedPosts.includes(this.postDetail._id)) {
            likedPosts.push(this.postDetail._id)
          }
          this.hasLiked = true
          this.toast.success('Terima kasih sudah like postingan ini! ❤️')
        } else {
          // Remove from liked posts
          const index = likedPosts.indexOf(this.postDetail._id)
          if (index > -1) {
            likedPosts.splice(index, 1)
          }
          this.hasLiked = false
          this.toast.info('Like dibatalkan')
        }
        
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
      } catch (error) {
        console.error('Error toggling like:', error)
        this.toast.error('Gagal ' + (action === 'like' ? 'like' : 'unlike') + ' postingan')
      } finally {
        this.liking = false
      }
    },

    async submitComment() {
      if (!this.newCommentContent.trim() || !this.isAuthenticated || !this.postDetail) {
        this.toast.error('Konten komentar tidak boleh kosong.') // Notifikasi Error
        return
      }
      try {
        await this.addComment({
          postId: this.postDetail._id,
          content: this.newCommentContent,
        })
        this.newCommentContent = '' // Clear the input field
        this.toast.success('Komentar berhasil ditambahkan!') // Notifikasi Sukses
      } catch (error) {
        console.error('Error submitting comment:', error)
        this.toast.error('Gagal mengirim komentar: ' + this.commentsError) // Notifikasi Error
      }
    },

    startEditComment(comment) {
      this.editingCommentId = comment._id
      this.editingCommentContent = comment.content
    },

    cancelEditComment() {
      this.editingCommentId = null
      this.editingCommentContent = ''
      this.$store.commit('comments/comments_error', null)
    },

    async saveEditedComment(commentId) {
      if (!this.editingCommentContent.trim()) {
        this.toast.error('Konten komentar tidak boleh kosong.') // Notifikasi Error
        return
      }
      if (!this.postDetail) {
        this.toast.error('Postingan tidak ditemukan.') // Notifikasi Error
        return
      }

      try {
        await this.updateComment({
          postId: this.postDetail._id,
          commentId: commentId,
          content: this.editingCommentContent,
        })
        this.toast.success('Komentar berhasil diperbarui!') // Notifikasi Sukses
        this.cancelEditComment()
      } catch (error) {
        console.error('Error updating comment:', error)
        this.toast.error('Gagal memperbarui komentar: ' + this.commentsError) // Notifikasi Error
      }
    },

    // Metode untuk mengkonfirmasi dan menghapus komentar
    async confirmDeleteComment(commentId) {
      if (!this.postDetail) {
        this.toast.error('Postingan tidak ditemukan.') // Notifikasi Error
        return
      }
      // Menggunakan `confirm()` bawaan browser untuk konfirmasi.
      if (
        confirm(
          'Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak dapat dibatalkan.',
        )
      ) {
        try {
          await this.deleteComment({
            postId: this.postDetail._id,
            commentId: commentId,
          })
          this.toast.info('Komentar berhasil dihapus!') // Notifikasi Info
        } catch (error) {
          console.error('Error deleting comment:', error)
          this.toast.error('Gagal menghapus komentar: ' + this.commentsError) // Notifikasi Error
        }
      }
      // Jika pengguna membatalkan (mengklik "Cancel" di confirm()), tidak ada toast yang muncul.
    },

    handleImageError(event) {
      // Sets default image if the provided image fails to load.
      event.target.src = '/uploads/default-post.jpg'
    },
  },
}
</script>

<style>
/* Styling untuk konten HTML yang di-render oleh v-html */
.prose {
  line-height: 1.75;
  font-size: 1.125rem; /* text-lg */
}

.prose p {
  margin-bottom: 1.25em;
  white-space: pre-wrap;
  text-align: left;
}

.prose h1,
.prose h2,
.prose h3 {
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  text-align: left;
}
.prose h1 {
  font-size: 2.25rem; /* text-4xl */
}
.prose h2 {
  font-size: 1.875rem; /* text-3xl */
}
.prose h3 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600;
}

.prose a {
  color: #4c51bf; /* indigo-600 */
  text-decoration: underline;
  font-weight: 500;
}
.prose ul,
.prose ol {
  margin-left: 1.5em;
  margin-bottom: 1.25em;
  text-align: left;
}
.prose ul li {
  list-style-type: disc;
  margin-bottom: 0.5em;
}
.prose ol li {
  list-style-type: decimal;
  margin-bottom: 0.5em;
}
.prose pre {
  background-color: #e2e8f0; /* gray-200 */
  padding: 1.25em;
  border-radius: 0.75em;
  overflow-x: auto;
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  line-height: 1.4;
  font-size: 0.9em;
  white-space: pre-wrap;
  text-align: left;
}
.prose code {
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  background-color: #e2e8f0;
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
  color: #553c9a; /* deep purple, for code consistency */
}
</style>
