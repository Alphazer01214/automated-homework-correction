<script setup lang="ts">
import {essayStore} from "@/stores/essayStore.ts";
</script>

<template>
  <h2>提交作文模块</h2>
  <div class="essay-form">
    <strong>作文题目</strong>
    <textarea v-model="essayStore.essay.question" placeholder="Question" required></textarea>
    <strong>作文内容</strong>
    <textarea v-model="essayStore.essay.student_answer" placeholder="Student Answer" required></textarea>
    <strong>参考批改意见</strong>
    <textarea v-model="essayStore.essay.ground_truth" placeholder="ground truth"></textarea>
    <strong>智能体批改意见</strong>
    <textarea v-model="essayStore.essay.model_feedback" placeholder="model_feedback"></textarea>
    <strong>编辑批改意见</strong>
    <div class="edits" v-for="(item, index) in essayStore.essay.edits" :key="index">
      <textarea v-model="essayStore.essay.edits[index]" placeholder="item"></textarea>
    </div>
    <button @click="essayStore.handleSubmit()">上传</button>

  </div>
</template>

<style scoped>

</style>
