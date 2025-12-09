<template>
  <div class="rich-text-editor">
    <QuillEditor
      ref="quillEditor"
      v-model:content="content"
      content-type="html"
      :toolbar="toolbarOptions"
      theme="snow"
      @ready="onEditorReady"
      @update:content="handleContentUpdate"
      :style="{ height: editorHeight }"
    />
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'

export default {
  name: 'RichTextEditor',
  components: {
    QuillEditor,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Tulis konten blog Anda di sini...',
    },
    height: {
      type: String,
      default: '400px',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      content: this.modelValue,
      toolbarOptions: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
    }
  },
  computed: {
    editorHeight() {
      return this.height
    },
  },
  watch: {
    modelValue(newValue) {
      if (newValue !== this.content) {
        this.content = newValue
      }
    },
  },
  methods: {
    onEditorReady(quill) {
      // Custom image handler
      const toolbar = quill.getModule('toolbar')
      toolbar.addHandler('image', this.imageHandler)
    },
    handleContentUpdate(content) {
      this.$emit('update:modelValue', content)
    },
    async imageHandler() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Ukuran gambar terlalu besar. Maksimal 5MB.')
          return
        }

        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
          alert('File harus berupa gambar.')
          return
        }

        try {
          // Upload image
          const formData = new FormData()
          formData.append('image', file)

          const token = JSON.parse(localStorage.getItem('user'))?.token
         const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const response = await axios.post(`${API_BASE}/api/upload`, formData, { 
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })

          // Insert image to editor
          const quill = this.$refs.quillEditor.getQuill()
          const range = quill.getSelection(true)
          const imageUrl = `${API_BASE}${response.data.image}`
          quill.insertEmbed(range.index, 'image', imageUrl)
          quill.setSelection(range.index + 1)
        } catch (error) {
          console.error('Error uploading image:', error)
          alert('Gagal mengunggah gambar: ' + (error.response?.data?.message || error.message))
        }
      }
    },
  },
}
</script>

<style scoped>
.rich-text-editor {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Override Quill styles */
:deep(.ql-container) {
  font-size: 16px;
  font-family: inherit;
}

:deep(.ql-editor) {
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
}

:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}

:deep(.ql-toolbar) {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  border-top: none;
  border-left: none;
  border-right: none;
}

:deep(.ql-stroke) {
  stroke: #4b5563;
}

:deep(.ql-fill) {
  fill: #4b5563;
}

:deep(.ql-picker-label) {
  color: #4b5563;
}

/* Hover states */
:deep(.ql-toolbar button:hover),
:deep(.ql-toolbar button:focus),
:deep(.ql-toolbar .ql-picker-label:hover),
:deep(.ql-toolbar .ql-picker-label:focus) {
  color: #4f46e5;
}

:deep(.ql-toolbar button:hover .ql-stroke),
:deep(.ql-toolbar button:focus .ql-stroke),
:deep(.ql-toolbar .ql-picker-label:hover .ql-stroke),
:deep(.ql-toolbar .ql-picker-label:focus .ql-stroke) {
  stroke: #4f46e5;
}

:deep(.ql-toolbar button:hover .ql-fill),
:deep(.ql-toolbar button:focus .ql-fill),
:deep(.ql-toolbar .ql-picker-label:hover .ql-fill),
:deep(.ql-toolbar .ql-picker-label:focus .ql-fill) {
  fill: #4f46e5;
}

/* Active states */
:deep(.ql-toolbar button.ql-active),
:deep(.ql-toolbar .ql-picker-label.ql-active) {
  color: #4f46e5;
}

:deep(.ql-toolbar button.ql-active .ql-stroke),
:deep(.ql-toolbar .ql-picker-label.ql-active .ql-stroke) {
  stroke: #4f46e5;
}

:deep(.ql-toolbar button.ql-active .ql-fill),
:deep(.ql-toolbar .ql-picker-label.ql-active .ql-fill) {
  fill: #4f46e5;
}
</style>
