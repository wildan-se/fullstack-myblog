<template>
  <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
    <p class="mb-4 text-lg font-semibold text-center text-gray-800">
      Apakah Anda yakin ingin menghapus postingan ini?
    </p>
    <div class="flex space-x-3">
      <button
        @click="confirmAction(true)"
        class="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Ya, Hapus
      </button>
      <button
        @click="confirmAction(false)"
        class="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Batal
      </button>
    </div>
  </div>
</template>

<script>
// Impor useToast untuk menutup toast setelah aksi
import { useToast } from 'vue-toastification'

export default {
  name: 'ConfirmationToast',
  props: {
    // Props yang akan diterima dari toast.show()
    toastId: {
      type: [String, Number],
      required: true,
    },
    // Fungsi callback yang akan dipanggil setelah pengguna mengkonfirmasi
    // Menerima parameter `isConfirmed: boolean`
    resolve: {
      type: Function,
      required: true,
    },
    // Fungsi untuk menutup toast secara manual
    // Biasanya disediakan oleh vue-toastification melalui props.
    closeToast: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const toast = useToast()

    // Metode yang dipanggil ketika tombol Ya/Tidak diklik
    const confirmAction = (isConfirmed) => {
      props.resolve(isConfirmed) // Panggil fungsi resolve dari props dengan hasil konfirmasi
      toast.dismiss(props.toastId) // Tutup toast setelah aksi
    }

    return {
      confirmAction,
    }
  },
}
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan, misal untuk dark mode */
</style>
