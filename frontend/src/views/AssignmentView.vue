<!-- src/views/AssignmentView.vue -->
<!--这是交作业的页面，需要加载交作业相关的components-->
<template>
  <h1>这是交作业的页面，需要加载交作业相关的components</h1>
  <div class="assignment-form">
    <h2>作业单</h2>
    <AssignmentForm />
  </div>
<!--  <div class="essay-form">-->
<!--    <h2>作文批改</h2>-->
<!--    <EssayForm />-->
<!--  </div>-->
</template>

<script setup lang="ts">

import AssignmentForm from "@/components/AssignmentForm.vue";
import EssayForm from "@/components/EssayForm.vue";
</script>

<style scoped>

</style>
