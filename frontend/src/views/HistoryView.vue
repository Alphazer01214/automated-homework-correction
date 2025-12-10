<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AssignmentHistory from "@/components/AssignmentHistory.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import {assignmentStore} from "@/stores/assignmentStore.ts";

</script>

<template>
  <h1>与查询相关功能的页面</h1>

  <div class="container">
    <div class="assignment-history">
      <AssignmentHistory />
    </div>

    <div class="assignment-detail">
      <AssignmentDetail />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 100px); /* 减去标题高度 */
  gap: 20px; /* 左右块之间的间距 */
  margin-top: 20px;
}

.assignment-history {
  flex: 1; /* 占据剩余空间的1份 */
  min-width: 300px; /* 最小宽度 */
  max-width: 40%; /* 最大宽度 */
  overflow-y: auto; /* 如果内容超出高度，显示滚动条 */
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.assignment-detail {
  flex: 2; /* 占据剩余空间的2份，所以右边是左边的2倍宽 */
  overflow-y: auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .assignment-history,
  .assignment-detail {
    max-width: 100%;
    min-width: 100%;
  }
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
}
</style>
