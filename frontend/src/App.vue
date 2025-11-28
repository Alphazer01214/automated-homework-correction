<!-- src/App.vue -->
<!--这是主程序，其他所有内容在此基础上展示-->
<template>
  <div>
    <header>
      <h1 style="font-size: xxx-large">
        AI 驱动的作业批改平台
      </h1>
      <div class="nav">
        <router-link to="/">首页</router-link>
        <span class="member-visible" v-if="userStore.isAuthenticated">
          欢迎用户 {{getUsername}}
          <router-link to="/submit">提交作业</router-link>
          <router-link to="/history">历史记录</router-link>
          <router-link to="/user">用户信息</router-link>
          <button @click="userStore.handleLogout()" style="color: red">登出</button>
        </span>
        <span class="guest-visible" v-else>
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </span>
      </div>
    </header>

    <main>
<!--      使用router切换页面-->
      <router-view />
    </main>

    <footer>
      <div>
        © 2025 AI作业批改平台 | 支持数学 · 语文 · 英语智能批改
      </div>
    </footer>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {userStore} from "@/stores/userStore.js";

const isLoggedIn = computed(() => {
  return userStore.isAuthenticated;
})

const getUsername = computed(() => {
  if(isLoggedIn.value){
    return userStore.user.username;
  }
  return "";
})

const logout = userStore.handleLogout;    // 这里不能加括号，否则立刻执行

</script>

<style>
// Flex 布局
.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  overflow-x: auto;
}
</style>
