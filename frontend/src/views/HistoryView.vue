<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { assignmentStore } from "@/stores/assignmentStore";

const historyList = ref([]);
const fetchError = ref(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  fetchError.value = null;

  try {
    // 调用新的方法
    const list = await assignmentStore.getHistoryList();
    if (list) {
        historyList.value = list;
        console.log(list);
    }
  } catch (e: any) {
    fetchError.value = e.message || "加载失败";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <h1>这里查询当前账户的历史记录</h1>
  <div>
    <h3>历史记录：找到<strong style="color: #acceed">{{historyList.length}}</strong>条记录</h3>
    <div v-if="loading">正在加载...</div>
    <div v-else-if="fetchError" style="color: red;">错误: {{ fetchError }}</div>
    <ul v-else-if="historyList.length > 0">
      <li v-for="item in historyList" :key="item.id">
        {{ item.subject }} - {{ item.status }} - {{item.id}}
        <ul v-for="(question, index) in item.questions" :key="index">
          [question] {{question.question}} - [student-answer] {{question.student_answer}} - [model-feedback] {{question.model_feedback}}
        </ul>
      </li>
    </ul>
    <div v-else>无记录。</div>
  </div>
</template>

<style scoped>
</style>
