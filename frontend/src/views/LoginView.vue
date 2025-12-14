<script setup lang="ts">
import { ref } from "vue";
import { userStore } from '@/stores/userStore.ts';

const message = ref('');
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  if (username.value === "" || password.value === "") {
    message.value = "Invalid username or password";
    username.value = '';
    password.value = '';
    return;
  }

  message.value = '';
  userStore.error = null;
  await userStore.handleLogin(username.value, password.value);

  if (userStore.error) {
    message.value = userStore.error;
  } else {
    message.value = 'Login successful!';
    username.value = '';
    password.value = '';
  }
};
</script>

<template>
  <div class="login-page">
    <h1 class="title">欢迎回来</h1>
    <p class="subtitle">登录 AI 作业批改平台，继续你的学习进度</p>

    <!-- 提示信息 -->
    <div
      v-if="message"
      class="message"
      :class="{ error: userStore.error, success: !userStore.error }"
    >
      {{ message }}
    </div>

    <form @submit.prevent="handleLogin" class="login-form form-card">
      <div class="input-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
          required
          autocomplete="username"
        />
      </div>

      <div class="input-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="btn">登录</button>

      <div class="form-footer">
        <span>还没有账号？</span>
        <RouterLink to="/register">立即注册</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 页面整体 */
.login-page {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeUp 0.6s ease-out;
}

/* 标题 */
.title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 16px;
  color: #6e6e73;
  margin-bottom: 24px;
}

/* 消息提示 */
.message {
  width: 100%;
  max-width: 420px;
  text-align: center;
  margin-bottom: 14px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
}

.message.error {
  background: #ffe5e5;
  color: #d93025;
}

.message.success {
  background: #e6f4ea;
  color: #137333;
}

/* 卡片 */
.form-card {
  width: 100%;
  max-width: 420px;
  padding: 32px 34px 28px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 14px 36px rgba(0,0,0,0.1);
  animation: scaleIn 0.4s ease-out;
}

/* 输入框 */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #444;
}

.input-group input {
  padding: 12px 14px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26,115,232,0.15);
}

/* 按钮 */
.btn {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, #1a73e8, #3a8bfd);
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 999px;
  cursor: pointer;
  margin-top: 8px;
  transition: 0.25s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(26,115,232,0.35);
}

/* 底部 */
.form-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.form-footer a {
  margin-left: 6px;
  color: #1a73e8;
  text-decoration: none;
  font-weight: 500;
}

/* 动效 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
