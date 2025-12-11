<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AssignmentHistory from "@/components/AssignmentHistory.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import {assignmentStore} from "@/stores/assignmentStore.ts";

</script>

<template>
  <h1>与查询相关功能的页面</h1>

  <div class="container row-layout">

    <div class="assignment-history panel">
      <AssignmentHistory />
    </div>

    <div class="assignment-detail panel">
      <AssignmentDetail />
    </div>

  </div>
</template>

<style scoped>
/* 主容器左右排版 */
.row-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

/* 每个模块的包裹区域 */
.panel {
  flex: 1;
  padding: 16px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

/* 左右比例可微调 */
.assignment-history {
  flex: 1.2; /* 左边稍宽 */
}

.assignment-detail {
  flex: 1.8; /* 右边更宽，可调 */
}

/* 小屏幕自动变上下排版 */
@media (max-width: 900px) {
  .row-layout {
    flex-direction: column;
  }
}
</style>
