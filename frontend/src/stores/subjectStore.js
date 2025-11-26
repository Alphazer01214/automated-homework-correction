// src/stores/subjectStore.js
// AI写的一坨，未来要重构
import { defineStore } from 'pinia'
import { getSubjects } from '@/api'

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    // 所有学科列表
    subjects: [],
    // 当前选中的学科（提交作业时使用）
    currentSubject: null,
    // 加载状态
    loading: false,
    error: null
  }),

  getters: {
    // 是否已选择学科
    hasSelected: (state) => !!state.currentSubject,

    // 根据 id 获取学科名称
    getSubjectName: (state) => (id) => {
      return state.subjects.find(s => s.id === id)?.name || '未知学科'
    },

    // 支持的作业类型（方便动态表单使用）
    supportedTypes: (state) => {
      if (!state.currentSubject) return []
      return state.subjects.find(s => s.id === state.currentSubject.id)?.assignment_types || []
    }
  },

  actions: {
    // 设置当前学科
    selectSubject(subject) {
      this.currentSubject = subject
    },

    // 清空选择
    clearSelection() {
      this.currentSubject = null
    },

    // 从后端获取最新学科列表
    async fetchSubjects() {
      if (this.subjects.length > 0) return // 已缓存则不再请求

      this.loading = true
      this.error = null
      try {
        const res = await getSubjects()
        if (res.success && res.data?.subjects) {
          this.subjects = res.data.subjects.map(s => ({
            ...s,
            // 兼容后端字段差异（API.md 用 assignment_types，app.py 用 supported_types）
            assignment_types: s.assignment_types || s.supported_types || []
          }))
        }
      } catch (err) {
        this.error = '获取学科列表失败'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})
