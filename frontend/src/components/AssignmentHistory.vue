<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { assignmentStore } from "@/stores/assignmentStore";
import {it} from "vitest";

onMounted(async () => {
  await assignmentStore.getHistoryList();
});

/* ===== 长文本展开控制 ===== */
const expandedMap = ref<Record<string, boolean>>({});

const TEXT_LIMIT = 120;

const isLongText = (text?: string) => {
  return text && text.length > TEXT_LIMIT;
};

const toggleText = (key: string) => {
  expandedMap.value[key] = !expandedMap.value[key];
};

const getDisplayText = (text: string, key: string) => {
  if (!isLongText(text)) return text;
  return expandedMap.value[key]
    ? text
    : text.slice(0, TEXT_LIMIT) + '...';
};
</script>


<template>
  <h2 class="title">{{ assignmentStore.user.username }} 的历史记录</h2>

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
              <div class="question-body">
  <!-- 题干 -->
  <div>
    <span class="q-label">题干：</span>
    {{ getDisplayText(
      question.question,
      item.id + '-' + question_index + '-q'
    ) }}
    <span
      v-if="isLongText(question.question)"
      class="toggle-text"
      @click="toggleText(item.id + '-' + question_index + '-q')"
    >
      {{ expandedMap[item.id + '-' + question_index + '-q'] ? '收起' : '展开' }}
    </span>
  </div>

  <!-- 学生回答 -->
  <div>
    <span class="q-label">学生回答：</span>
    {{ getDisplayText(
      question.student_answer,
      item.id + '-' + question_index + '-a'
    ) }}
    <span
      v-if="isLongText(question.student_answer)"
      class="toggle-text"
      @click="toggleText(item.id + '-' + question_index + '-a')"
    >
      {{ expandedMap[item.id + '-' + question_index + '-a'] ? '收起' : '展开' }}
    </span>
  </div>

  <!-- 模型反馈 -->
  <div v-if="question.model_feedback">
    <span class="q-label">模型反馈：</span>
    {{ getDisplayText(
      question.model_feedback,
      item.id + '-' + question_index + '-f'
    ) }}
    <span
      v-if="isLongText(question.model_feedback)"
      class="toggle-text"
      @click="toggleText(item.id + '-' + question_index + '-f')"
    >
      {{ expandedMap[item.id + '-' + question_index + '-f'] ? '收起' : '展开' }}
    </span>
  </div>
</div>

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
          <button
            @click="assignmentStore.deleteAssignmentById(item.id)"
            class="btn detail-btn"
            >
            删除此作业
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

  height: 114vh;          /* 固定高度（相对视口） */
  overflow-y: auto;      /* 开启纵向滚动 */
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

.toggle-text {
  margin-left: 6px;
  color: #1a73e8;
  cursor: pointer;
  font-size: 13px;
  user-select: none;
}

.toggle-text:hover {
  text-decoration: underline;
}

</style>
