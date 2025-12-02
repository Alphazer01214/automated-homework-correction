<script setup lang="ts">
import {ref} from "vue";
import {assignmentStore} from "@/stores/assignmentStore";


</script>

<template>
  <label>学科：</label>
  <select v-model="assignmentStore.assignments.subject" class="subject-selector">
    <option value="Chinese">语文 Chinese</option>
    <option value="math">数学 Math</option>
    <option value="English">英语 English</option>
  </select>
  <div class="question-form" v-for="(q, index) in assignmentStore.questions" :key="index">
    <textarea v-model="q.question" placeholder="Text in your question"></textarea>
    <textarea v-model="q.student_answer" placeholder="Text in your answer"></textarea>
    <button @click="assignmentStore.removeQuestion(index)">删除这题</button>
  </div>
  <button @click="assignmentStore.addQuestion">添加题目</button>
  <button @click="assignmentStore.handleSubmit()">提交</button>
</template>

<style scoped>

</style>
