<script setup lang="ts">
import {assignmentStore} from "@/stores/assignmentStore.ts";
import {ref} from "vue";
</script>

<template>
  <h2>作业详情</h2>

  <div v-if="assignmentStore.showDetail">
    <div v-for="(value, key) in assignmentStore.history[assignmentStore.currentAssignmentIndex]" :key>
      {{key}}: {{value}}
    </div>
    <button @click="assignmentStore.showDetailByIndex(-1)">收起详情</button>
  </div>
</template>

<style scoped>

</style>
