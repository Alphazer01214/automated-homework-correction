<template>
  <div class="app-container">

    <!-- Header -->
    <header class="header">
      <h1 class="title">
        AI 驱动的作业批改平台
      </h1>

      <nav class="nav">
        <router-link class="nav-link" to="/">首页</router-link>

        <span class="member-visible" v-if="userStore.isAuthenticated">
          <span class="welcome">欢迎用户 <span style="color: #acceed">{{ getUsername }}</span></span>
          <router-link class="nav-link" to="/submit">提交作业</router-link>
          <router-link class="nav-link" to="/history">历史记录</router-link>
          <router-link class="nav-link" to="/user">用户信息</router-link>
          <button class="logout-btn" @click="userStore.handleLogout()">登出</button>
        </span>

        <span class="guest-visible" v-else>
          <router-link class="nav-link" to="/login">登录</router-link>
          <router-link class="nav-link" to="/register">注册</router-link>
        </span>
      </nav>
    </header>

    <!-- Main -->
    <main class="main">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      © 2025 AI作业批改平台 | 支持数学 · 语文 · 英语智能批改
    </footer>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { userStore } from "@/stores/userStore.ts";

const isLoggedIn = computed(() => userStore.isAuthenticated);

const getUsername = computed(() => {
  return isLoggedIn.value ? userStore.user.username : "";
});
</script>

<style>

/* 整体布局 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fafafa;
  font-family: "Segoe UI", sans-serif;
}

/* 顶部条 */
.header {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 22px 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* 标题 */
.title {
  font-size: 38px;
  margin-bottom: 18px;
  color: #333;
}

/* 导航栏 */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 17px;
}

/* 链接统一风格 */
.nav-link {
  text-decoration: none;
  color: #1a73e8;
  padding: 6px 10px;
  border-radius: 6px;
  transition: 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  background: #e8f0fe;
}

/* 欢迎文字 */
.welcome {
  color: #333;
  margin-right: 6px;
  font-weight: 600;
}

/* 登出按钮 */
.logout-btn {
  padding: 6px 12px;
  border: none;
  background: #ff4d4f;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}
.logout-btn:hover {
  background: #e13b3d;
}

/* 主体内容 */
.main {
  flex: 1;
  padding: 30px 40px;
}

/* 页脚 */
.footer {
  background: #ffffff;
  padding: 16px 24px;
  border-top: 1px solid #e5e5e5;
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>
