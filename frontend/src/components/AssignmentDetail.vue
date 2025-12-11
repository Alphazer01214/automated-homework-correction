<script setup lang="ts">
import { assignmentStore } from "@/stores/assignmentStore.ts";
import { MarkdownMathParser } from "@/utils/markdownRender";
import { ref, watchEffect } from "vue";

const parser = new MarkdownMathParser({
  enableMath: true,
  enableHighlight: true
});

// 用来存放解析后的 HTML
const renderedList = ref([]);

watchEffect(async () => {
  if (!assignmentStore.showDetail) return;

  const questions = assignmentStore.history[assignmentStore.currentAssignmentIndex]
    ?.model_feedback?.questions || [];

  // 渲染所有字段
  const result = [];
  for (const q of questions) {
    result.push({
      question: await parser.parse(q.question),
      student_answer: await parser.parse(q.student_answer),
      correct_answer: await parser.parse(q.correct_answer),
      explanation: await parser.parse(q.explanation),
      knowledge: q.knowledge,
      score: q.score
    });
  }
  renderedList.value = result;
});
</script>

<template>
  <div v-if="assignmentStore.showDetail" class="detail-box page">
    <h2 class="detail-title title">作业 {{ assignmentStore.currentAssignmentIndex + 1 }} 详情</h2>

    <div v-if="renderedList.length" class="feedback-list">
      <div v-for="(q, idx) in renderedList" :key="idx" class="feedback-item">

        <div class="row">
          <div class="label">题目：</div>
          <div class="text" v-html="q.question"></div>
        </div>

        <div class="row">
          <div class="label">学生作答：</div>
          <div class="text" v-html="q.student_answer"></div>
        </div>

        <div class="row">
          <div class="label">正确答案：</div>
          <div class="text correct" v-html="q.correct_answer"></div>
        </div>

        <div class="row">
          <div class="label">解析：</div>
          <div class="text" v-html="q.explanation"></div>
        </div>

        <div class="row">
          <div class="label">涉及知识点：</div>
          <div class="text knowledge">{{ q.knowledge.join('、') }}</div>
        </div>

        <div class="mf-score score"
             :class="{
              'score-low': q.score < 60,
              'score-mid': q.score >= 60 && q.score < 80,
              'score-high': q.score >= 80
             }"
        >
          得分：{{ q.score }}分
        </div>

      </div>
    </div>

    <button @click="assignmentStore.showDetailByIndex(-1)" class="btn action-btn">
      收起详情
    </button>

  </div>

  <div v-else class="detail-box page">
    <h2 class="detail-title title">此处可查看作业详情</h2>
  </div>
</template>


<style scoped>
/* 整体布局 */
.page {
  padding: 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* 标题 */
.title {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
}

/* 列表区 */
.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* 每一题 */
.feedback-item {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 行结构 */
.row {
  display: flex;
  gap: 6px;
  line-height: 1.6;
}

.label {
  color: #555;
  font-weight: 600;
  min-width: 90px;
}

.text {
  color: #333;
}

/* 特殊文本样式 */
.correct {
  color: #1a7f37;
  font-weight: 600;
}
.knowledge {
  color: #2456d1;
}

/* 分数样式 */
.score {
  margin-top: 6px;
  font-weight: 700;
}

.score-low {
  color: #d93025;
}
.score-mid {
  color: #e68a00;
}
.score-high {
  color: #0f8f3d;
}

/* 按钮 */
.action-btn {
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 8px;
  background: #3a6ff7;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.action-btn:hover {
  background: #255df2;
}
</style>

