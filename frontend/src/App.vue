<!-- src/App.vue -->
<!--这是主程序，其他所有内容在此基础上展示-->
<template>
  <div>
    <header>
      <h1>
        AI 驱动的作业批改平台
      </h1>
      <router-link to="/">首页</router-link>
      <router-link to="/submit">提交作业</router-link>
      <router-link to="/history">历史记录</router-link>
    </header>

    <main>
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
</script>

<style>
</style>
