<script setup lang="ts">
import {userStore} from "@/stores/userStore.ts";
</script>

<template>
  <h1 class="title">用户信息</h1>

  <div class="user-info card">
    <li
      v-for="(value, key) in userStore.user"
      :key="key"
      class="info-row"
    >
      <strong class="info-key">{{ key }}</strong>
      <span class="info-value">: {{ value }}</span>
    </li>
  </div>
</template>

<style scoped>
.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 14px;
}

/* 卡片外观 */
.card {
  padding: 18px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
  max-width: 500px;
}

/* 每行数据 */
.info-row {
  padding: 6px 0;
  display: flex;
  align-items: center;
  font-size: 15px;
}

/* key-value 样式 */
.info-key {
  width: 110px;
  font-weight: 600;
  color: #444;
}

.info-value {
  color: #222;
}

/* li 默认样式清理 */
.user-info li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
