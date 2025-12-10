<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AssignmentHistory from "@/components/AssignmentHistory.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import {assignmentStore} from "@/stores/assignmentStore.ts";

</script>

<template>
  <h1>与查询相关功能的页面</h1>
  <div v-if="assignmentStore.showDetail">
    <AssignmentDetail />
  </div>
  <AssignmentHistory />
</template>

<style scoped>
</style>
