<script setup lang="ts">
import { assignmentStore } from "@/stores/assignmentStore.ts";
import { ref } from "vue";
</script>

<template>
  <div v-if="assignmentStore.showDetail" class="detail-box">

    <h2 class="detail-title">作业 {{ assignmentStore.currentAssignmentIndex + 1 }} 详情</h2>

    <div
      v-for="(value, key) in assignmentStore.history[assignmentStore.currentAssignmentIndex]"
      :key="key"
      class="detail-row"
    >
      <div class="detail-key">{{ key }}</div>
      <div class="detail-value">{{ value }}</div>
    </div>

    <button @click="assignmentStore.showDetailByIndex(-1)" class="btn">
      收起详情
    </button>

  </div>
  <div v-else class="detail-box">
    <h2 class="detail-title">此处可查看作业详情</h2>
  </div>
</template>

<style scoped>
/* 整体容器 */
.detail-box {
  background: #fff;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  max-width: 800px;
  margin: 20px auto;
  font-family: "Segoe UI", Helvetica, Arial;
}

/* 标题 */
.detail-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

/* 单行结构 */
.detail-row {
  display: flex;
  padding: 8px 10px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 4px solid #acd2ff;
}

/* 左侧 key */
.detail-key {
  width: 120px;
  font-weight: 600;
  color: #555;
}

/* 右侧 value */
.detail-value {
  color: #333;
  flex: 1;
  word-break: break-word;
}

/* 按钮 */
.btn {
  margin-top: 10px;
  padding: 8px 14px;
  background: #4aa3df;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #3c8cc9;
}
</style>
