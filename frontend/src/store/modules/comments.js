// src/store/modules/comment.js

import axios from 'axios'

// API Base URL Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// 2. Definisi State
const state = {
  comments: [],
  loading: false,
  error: null,
}

// 3. Getters
const getters = {
  postComments: (state) => state.comments,
  commentsLoading: (state) => state.loading,
  commentsError: (state) => state.error,
}

// 4. Mutations
const mutations = {
  comments_request(state) {
    state.loading = true
    state.error = null
  },
  set_comments(state, comments) {
    state.comments = comments
    state.loading = false
  },
  comments_error(state, error) {
    state.loading = false
    state.error = error
  },
  add_comment(state, comment) {
    state.comments.push(comment)
    state.loading = false
  },
  // NEW: Mutasi untuk memperbarui komentar di dalam daftar
  update_comment(state, updatedComment) {
    const index = state.comments.findIndex((c) => c._id === updatedComment._id)
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment)
    }
    state.loading = false
  },
  // NEW: Mutasi untuk menghapus komentar dari daftar
  delete_comment(state, commentId) {
    state.comments = state.comments.filter((c) => c._id !== commentId)
    state.loading = false
  },
}

// 5. Actions
const actions = {
  async fetchCommentsForPost({ commit }, postId) {
    commit('comments_request')
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}/comments`)
      commit('set_comments', response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('comments_error', errorMessage)
    }
  },

  async addComment({ commit }, { postId, content }) {
    commit('comments_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/${postId}/comments`,
        { content },
        config,
      )
      commit('add_comment', response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('comments_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },

  // NEW: Aksi untuk memperbarui komentar
  async updateComment({ commit }, { postId, commentId, content }) {
    commit('comments_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }
      const response = await axios.put(
        `${API_BASE_URL}/api/posts/${postId}/comments/${commentId}`,
        { content },
        config,
      )
      commit('update_comment', response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('comments_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },

  // NEW: Aksi untuk menghapus komentar
  async deleteComment({ commit }, { postId, commentId }) {
    commit('comments_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
      await axios.delete(`${API_BASE_URL}/api/posts/${postId}/comments/${commentId}`, config)
      commit('delete_comment', commentId)
      return Promise.resolve('Komentar berhasil dihapus.')
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('comments_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
}

export default { namespaced: true, state, getters, mutations, actions }
