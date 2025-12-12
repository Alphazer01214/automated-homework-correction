<script setup lang="ts">
import {ref} from "vue";
import {assignmentStore} from "@/stores/assignmentStore";
</script>

<template>
  <div class="assignment-form-container">

    <!-- 学科选择 -->
    <div class="form-group card">
      <label class="form-label">学科 Subject：</label>
      <select
        v-model="assignmentStore.assignments.subject"
        class="subject-selector"
      >
        <option value="Chinese">语文 Chinese</option>
        <option value="math" selected>数学 Math</option>
        <option value="English">英语 English</option>
      </select>
    </div>

    <!-- 题目列表 -->
    <div class="questions-section card">
      <h3 class="section-title">题目列表 Questions</h3>

      <div
        class="question-card subcard"
        v-for="(q, index) in assignmentStore.questions"
        :key="index"
      >
        <div class="question-header">
          <span class="question-index">第 {{ index + 1 }} 题</span>
          <button
            @click="assignmentStore.removeQuestion(index)"
            class="btn-delete"
            title="删除本题"
          >
            ✕
          </button>
        </div>

        <textarea
          v-model="q.question"
          placeholder="请输入题目内容（支持中文/英文/LaTeX）"
          class="input-textarea"
        ></textarea>

        <textarea
          v-model="q.student_answer"
          placeholder="请输入你的解答"
          class="input-textarea"
        ></textarea>
      </div>

      <!-- 添加题目按钮 -->
      <button @click="assignmentStore.addQuestion" class="btn-add">
        添加新题目
      </button>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-section">
      <button @click="assignmentStore.handleSubmit()" class="btn-submit">
        提交作业 Submit Assignment
      </button>
    </div>

  </div>
</template>

<style scoped>
/* 主容器 */
.assignment-form-container {
  max-width: 700px;
  margin: auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 卡片通用样式 */
.card {
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}

/* 子卡片（每道题） */
.subcard {
  padding: 14px;
  margin-top: 14px;
  border-radius: 10px;
  background: #fafafa;
  border: 1px solid #ddd;
}

/* 标题 */
.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

/* 题目头部 */
.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.question-index {
  font-weight: 600;
  font-size: 15px;
}

/* 删除按钮 */
.btn-delete {
  border: none;
  background: #ff5c5c;
  color: white;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}
.btn-delete:hover {
  background: #e14040;
}

/* 输入框 */
.input-textarea {
  width: 100%;
  min-height: 70px;
  padding: 10px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 14px;
}
.input-textarea:focus {
  outline: none;
  border-color: #3a6ff7;
}

/* 下拉选择 */
.subject-selector {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #bbb;
  margin-left: 10px;
}

/* 添加按钮 */
.btn-add {
  margin-top: 14px;
  padding: 10px 14px;
  background: #3a6ff7;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-add:hover {
  background: #2957d3;
}

/* 提交区域 */
.submit-section {
  display: flex;
  justify-content: center;
  margin-top: -10px;
}

/* 提交按钮 */
.btn-submit {
  padding: 12px 20px;
  background: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
.btn-submit:hover {
  background: #27b863;
}
</style>
