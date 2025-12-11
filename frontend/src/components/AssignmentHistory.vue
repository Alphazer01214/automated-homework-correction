<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { assignmentStore } from "@/stores/assignmentStore";

onMounted(async () => {
  await assignmentStore.getHistoryList();
});
</script>

<template>
  <h2 class="title">这里查询当前账户的历史记录</h2>

  <div class="container">

    <div v-if="assignmentStore.loading" class="loading">正在加载...</div>

    <div v-else-if="assignmentStore.error" class="error">
      错误: {{ assignmentStore.error }}
    </div>

    <div v-else-if="assignmentStore.history.length > 0" class="list">

      <div class="subtitle">
        历史记录：找到
        <strong class="count">{{ assignmentStore.history.length }}</strong>
        条记录
      </div>

      <div
        v-for="(item, assignment_index) in assignmentStore.history"
        :key="item.id"
        class="item card"
      >
        <!-- 上方：基础信息 -->
        <div class="info-section">
          <div class="info-grid">
            <div class="info-pair">
              <span class="info-label">科目：</span>
              <span class="info-value">{{ item.subject }}</span>
            </div>

            <div class="info-pair">
              <span class="info-label">状态：</span>
              <span class="info-value">{{ item.status }}</span>
            </div>

            <div class="info-pair">
              <span class="info-label">记录 ID：</span>
              <span class="info-value">{{ item.id }}</span>
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="divider"></div>

        <!-- 题目记录 -->
        <div class="questions-section">
          <div class="questions-title">题目记录：</div>

          <div
            v-for="(question, question_index) in item.questions"
            :key="question_index"
            class="question-item"
          >
            <div class="question-header">
              题目 {{ question_index }}：
            </div>

            <div class="question-body">
              <div><span class="q-label">题干：</span>{{ question.question }}</div>
              <div><span class="q-label">学生回答：</span>{{ question.student_answer }}</div>
              <div><span class="q-label">模型反馈：</span>{{ question.model_feedback }}</div>
            </div>
          </div>

        </div>

        <!-- 下方按钮 -->
        <div class="btn-wrapper">
          <button
            v-if="item.model_feedback"
            @click="assignmentStore.showDetailByIndex(assignment_index)"
            class="btn detail-btn"
          >
            查看作业 {{ assignment_index + 1 }} 详情
          </button>
        </div>

      </div>
    </div>

    <div v-else class="empty">无记录。</div>

  </div>
</template>

<style scoped>
/* 页面结构 */
.container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* 状态提示 */
.loading,
.error,
.empty {
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
}

.error {
  color: #d93025;
}

.empty {
  color: #555;
}

/* 历史列表 */
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.subtitle {
  font-size: 16px;
}

.count {
  color: #1a73e8;
}

/* 卡片结构 */
.card {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 基础信息布局：三列 */
.info-section {
  margin-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.info-pair {
  display: flex;
  align-items: center;
}

.info-label {
  font-weight: 600;
  min-width: 70px;
  color: #444;
}

.info-value {
  color: #333;
}

/* 分割线 */
.divider {
  height: 1px;
  background: #e5e5e5;
  margin: 14px 0;
}

/* 题目模块 */
.questions-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

.question-item {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
  padding: 12px;
  margin-bottom: 12px;
}

.question-header {
  font-weight: 600;
  margin-bottom: 6px;
}

.q-label {
  font-weight: 600;
  color: #555;
}

/* 按钮 */
.btn-wrapper {
  margin-top: 12px;
  text-align: right;
}

.detail-btn {
  padding: 8px 14px;
  border: none;
  background: #3a6ff7;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.detail-btn:hover {
  background: #2a57d8;
}
</style>
