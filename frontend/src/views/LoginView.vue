<script setup lang="ts">
import {ref} from "vue";
import {userStore} from '@/stores/userStore.ts';

const message = ref('');
const username = ref('');
const password = ref('');

const handleLogin = async ()=>{
  if(username.value === "" || password.value === ""){
    message.value = "Invalid username or password";
    username.value = '';
    password.value = '';
    return;
  }

  message.value = '';
  userStore.error = null;
  await userStore.handleLogin(username.value, password.value);

  if(userStore.error){
    message.value = userStore.error;
  }else{
    message.value = 'Successfully registered!';
    username.value = '';
    password.value = '';
  }
}
</script>

<template>
  <h1 class="title">这是登录页面</h1>

  <!-- 显示消息 -->
  <div
    v-if="message"
    class="message"
    :class="{ error: userStore.error }"
  >
    {{ message }}
  </div>

  <form @submit.prevent="handleLogin" class="login-form form-card">

    <div class="input-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
        autocomplete="username"
      >
    </div>

    <div class="input-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        autocomplete="new-password"
      >
    </div>

    <button type="submit" class="btn">Login</button>

  </form>
</template>

<style scoped>
/* 页面整体居中布局 */
.title {
  text-align: center;
  margin-bottom: 20px;
}

/* 消息提示 */
.message {
  text-align: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  color: #d93025;
}
.message.error {
  background: #ffe5e5;
}

/* 登录卡片 */
.form-card {
  max-width: 380px;
  margin: 0 auto;
  padding: 22px 26px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
}

/* 输入块 */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 4px;
  color: #444;
}

.input-group input {
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.input-group input:focus {
  outline: none;
  border-color: #3a6ff7;
  box-shadow: 0 0 0 2px rgba(58,111,247,0.15);
}

/* 按钮样式 */
.btn {
  width: 100%;
  padding: 10px 14px;
  background: #3a6ff7;
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}

.btn:hover {
  background: #255de5;
}
</style>
