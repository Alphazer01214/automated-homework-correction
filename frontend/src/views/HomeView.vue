<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">让 AI 成为你的助教</h1>
        <p class="hero-subtitle">
          覆盖语文 · 数学 · 英语的智能作业批改平台，
          秒级反馈，结构化解析，真正减负提效。
        </p>

        <div class="hero-actions">
          <div v-if="!isLoggedIn">
            <RouterLink to="/login" class="btn primary">现在登录</RouterLink>
            <RouterLink to="/login" class="btn ghost">批改你的第一份作业</RouterLink>
          </div>
          <div v-else>
            <RouterLink to="/submit" class="btn ghost">批改你的第一份作业</RouterLink>
          </div>
        </div>

        <div class="hero-mock">
          <div class="card float delay-1">
            <h4>数学作业</h4>
            <p>得分：92</p>
          </div>
          <div class="card float delay-2">
            <h4>作文点评</h4>
            <p>结构清晰，用词准确</p>
          </div>
          <div class="card float delay-3">
            <h4>英语练习</h4>
            <p>语法错误 ×2</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <h2>为学习与教学而生</h2>
      <div class="feature-grid">
        <div class="feature-card reveal">
          <h3>AI 智能批改</h3>
          <p>基于大语言模型，自动分析答案，给出评分与改进建议。</p>
        </div>
        <div class="feature-card reveal delay-1">
          <h3>多学科支持</h3>
          <p>数学计算、语文作文、英语练习，一站式完成。</p>
        </div>
        <div class="feature-card reveal delay-2">
          <h3>完整学习记录</h3>
          <p>每一次作业、每一次进步，都清晰可追溯。</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>现在开始，让作业批改更简单</h2>
      <div v-if="!isLoggedIn">
        <RouterLink to="/register" class="btn primary large">免费注册使用</RouterLink>
      </div>
      <div v-else>
        <RouterLink to="/submit" class="btn primary large">免费注册使用</RouterLink>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from "vue";
import { userStore } from "@/stores/userStore.ts";

const isLoggedIn = computed(() => userStore.isAuthenticated);

const getUsername = computed(() => {
  return isLoggedIn.value ? userStore.user.username : "";
});
</script>

<style scoped>
.home {
  color: #1d1d1f;
}

/* Hero */
.hero {
  background: radial-gradient(circle at top, #ffffff, #f3f4f6);
  padding: 120px 40px 160px;
  overflow: hidden;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -1px;
  animation: fadeUp 0.8s ease-out forwards;
}

.hero-subtitle {
  font-size: 22px;
  color: #6e6e73;
  margin: 24px auto 40px;
  max-width: 720px;
  animation: fadeUp 1s ease-out forwards;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
  animation: fadeUp 1.2s ease-out forwards;
}

.btn {
  padding: 14px 32px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
}

.btn.primary {
  background: #1a73e8;
  color: #fff;
}

.btn.primary:hover {
  background: #1558b0;
}

.btn.ghost {
  border: 1px solid #d2d2d7;
  color: #1d1d1f;
}

.btn.large {
  font-size: 18px;
  padding: 16px 40px;
}

/* Floating cards */
.hero-mock {
  position: relative;
  height: 180px;
}

.card {
  position: absolute;
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 26px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  font-size: 14px;
}

.card:nth-child(1) { left: 20%; }
.card:nth-child(2) { left: 45%; top: 40px; }
.card:nth-child(3) { left: 65%; }

.float {
  animation: float 6s ease-in-out infinite;
}

/* Features */
.features {
  padding: 120px 40px;
  background: #ffffff;
  text-align: center;
}

.features h2 {
  font-size: 36px;
  margin-bottom: 64px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: #f5f5f7;
  border-radius: 24px;
  padding: 40px 32px;
}

/* CTA */
.cta {
  padding: 120px 40px;
  background: linear-gradient(180deg, #f5f5f7, #ffffff);
  text-align: center;
}

.cta h2 {
  font-size: 34px;
  margin-bottom: 32px;
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
}

.delay-1 { animation-delay: 0.3s; }
.delay-2 { animation-delay: 0.6s; }
.delay-3 { animation-delay: 0.9s; }
</style>
