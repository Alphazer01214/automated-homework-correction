<script setup lang="ts">
import {ref} from "vue";
import {userStore} from '@/stores/userStore';

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
  userStore.error = null;   // 清除错误
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
  <h1>这是登录页面</h1>
  <!-- 显示消息 -->
  <div v-if="message" class="message" :class="{ error: userStore.error }" style="color: red">
    {{ message }}
  </div>
<!--  v-on: submit,prevent: 阻止默认跳转 -->
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="login-username">
      <label for="username">Username: </label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
        autocomplete="username"
      >
    </div>

    <div class="login-password">
      <label for="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        autocomplete="new-password"
      >
    </div>

    <button type="submit">Login</button>
  </form>
</template>

<style scoped>

</style>
