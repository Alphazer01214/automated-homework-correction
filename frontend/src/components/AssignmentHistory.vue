<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { assignmentStore } from "@/stores/assignmentStore";
import { getHistory } from "@/api";

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

    <ul v-else-if="assignmentStore.history.length > 0" class="list">
      <h3 class="subtitle">
        历史记录：找到
        <strong class="count">{{ assignmentStore.history.length }}</strong>
        条记录
      </h3>

      <li
        v-for="(item, assignment_index) in assignmentStore.history"
        :key="item.id"
        class="item"
      >
        <!-- 基础信息 -->
        <div class="info-row">
          <div class="info-label">科目：</div>
          <div class="info-value">{{ item.subject }}</div>
        </div>

        <div class="info-row">
          <div class="info-label">状态：</div>
          <div class="info-value">{{ item.status }}</div>
        </div>

        <div class="info-row">
          <div class="info-label">记录 ID：</div>
          <div class="info-value">{{ item.id }}</div>
        </div>

        <!-- 题目列表 -->
        <div class="questions-title">题目记录：</div>

        <ul
          v-for="(question, question_index) in item.questions"
          :key="question_index"
          class="question-list"
        >
          <div class="question-item">
            <div class="question-index">题目 {{ question_index }}：</div>
            <div class="question-text">
              <div><span class="q-label">题干：</span>{{ question.question }}</div>
              <div><span class="q-label">学生回答：</span>{{ question.student_answer }}</div>
              <div><span class="q-label">模型反馈：</span>{{ question.model_feedback }}</div>
            </div>
          </div>
        </ul>

        <!-- 按钮 -->
        <button
          @click="assignmentStore.showDetailByIndex(assignment_index)"
          class="btn"
        >
          查看作业 {{ assignment_index + 1 }} 详情
        </button>
      </li>

    </ul>

    <div v-else class="empty">无记录。</div>
  </div>
</template>

<style scoped>
/* 整体布局 */
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 12px;
  font-family: "Segoe UI", Helvetica, Arial;
  line-height: 1.6;
}

/* 标题样式 */
.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* 副标题 */
.subtitle {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

/* 数量高亮 */
.count {
  color: #4aa3df;
}

/* 状态消息 */
.loading,
.error,
.empty {
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.loading {
  background: #eaf6ff;
  color: #1b6aa8;
}

.error {
  background: #ffe8e8;
  color: #d02626;
}

.empty {
  background: #f4f4f4;
  color: #666;
}

/* 列表整体 */
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
/* 每条记录卡片 */
.item {
  background: #fff;
  padding: 16px;
  margin-bottom: 18px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

/* 信息行排版 */
.info-row {
  display: flex;
  margin-bottom: 6px;
  font-size: 15px;
}

.info-label {
  width: 80px;
  color: #666;
  font-weight: 600;
}

.info-value {
  color: #333;
}

/* 题目部分样式 */
.questions-title {
  margin-top: 12px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #444;
}

/* 单条题目布局 */
.question-item {
  padding: 8px 10px;
  background: #f8fafc;
  border-radius: 6px;
  border-left: 4px solid #acd2ff;
}

.question-index {
  font-weight: bold;
  margin-bottom: 4px;
  color: #4a81c4;
}

.question-text div {
  margin: 3px 0;
  color: #444;
}

.q-label {
  font-weight: 600;
  color: #555;
}

/* 去除内层 UL 的默认样式 */
.question-list {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

/* 按钮 */
.btn {
  margin-top: 12px;
  padding: 6px 12px;
  background: #4aa3df;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #3b8cc8;
}

</style>
