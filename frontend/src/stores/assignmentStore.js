// src/stores/assignmentStore.js
// AI写的一坨，未来要重构
import { defineStore } from 'pinia'
import { submitAssignment, getAssignmentResult } from '@/api'
import { useRouter } from 'vue-router'

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    // 当前提交的作业ID
    currentAssignmentId: null,
    // 批改结果（完成后存储）
    result: null,
    // 状态：idle | submitting | polling | completed | failed
    status: 'idle',
    // 轮询定时器
    pollInterval: null,
    // 错误信息
    error: null
  }),

  getters: {
    isProcessing: (state) => ['submitting', 'polling'].includes(state.status),
    isCompleted: (state) => state.status === 'completed',
    overallScore: (state) => state.result?.overall_score || 0,
    feedbackList: (state) => state.result?.feedback || []
  },

  actions: {
    // 开始提交作业
    async submit(payload) {
      this.status = 'submitting'
      this.error = null
      this.result = null

      try {
        const formData = new FormData()

        // 基础字段
        formData.append('subject_id', payload.subject_id)
        formData.append('assignment_type', payload.assignment_type)
        if (payload.metadata?.title) {
          formData.append('metadata', JSON.stringify(payload.metadata))
        }

        // 处理每一道题
        payload.questions.forEach((q, index) => {
          formData.append(`questions[${index}][question]`, q.question || '')
          formData.append(`questions[${index}][student_answer]`, q.student_answer || '')
          if (q.image_file) {
            formData.append(`questions[${index}][image_file]`, q.image_file)
          }
        })

        const res = await submitAssignment(formData)

        if (res.success && res.data?.assignment_id) {
          this.currentAssignmentId = res.data.assignment_id
          this.startPolling()
          return res
        }
      } catch (err) {
        this.error = err.message || '提交失败'
        this.status = 'failed'
        throw err
      }
    },

    // 开始轮询结果
    startPolling() {
      if (this.pollInterval) clearInterval(this.pollInterval)

      this.status = 'polling'

      this.pollInterval = setInterval(async () => {
        try {
          const res = await getAssignmentResult(this.currentAssignmentId)
          if (res.success && res.data?.status) {
            if (res.data.status === 'completed') {
              this.result = res.data
              this.status = 'completed'
              this.stopPolling()
            } else if (res.data.status === 'failed') {
              this.status = 'failed'
              this.error = 'AI批改失败，请联系管理员'
              this.stopPolling()
            }
            // processing / queued 继续轮询
          }
        } catch (err) {
          console.warn('轮询异常，继续尝试...', err)
        }
      }, 3500) // 每3.5秒查一次
    },

    // 停止轮询
    stopPolling() {
      if (this.pollInterval) {
        clearInterval(this.pollInterval)
        this.pollInterval = null
      }
    },

    // 清理状态（切换页面时使用）
    reset() {
      this.stopPolling()
      this.currentAssignmentId = null
      this.result = null
      this.status = 'idle'
      this.error = null
    }
  }
})
