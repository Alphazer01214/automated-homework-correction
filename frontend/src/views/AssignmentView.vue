<!-- src/views/AssignmentView.vue -->
<!--这是交作业的页面，需要加载交作业相关的components-->
<template>
  <h1>这是交作业的页面，需要加载交作业相关的components</h1>
  <div class="assignment-form">
    <h2>作业单</h2>
    <AssignmentForm />
  </div>
</template>

<script setup lang="ts">

import AssignmentForm from "@/components/AssignmentForm.vue";
</script>

<style scoped>

</style>
