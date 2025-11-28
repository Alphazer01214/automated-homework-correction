<script setup lang="ts">
import {ref} from "vue";
import {userStore} from '@/stores/userStore';

const message = ref('')
const username = ref('');
const password = ref('');
const passwordTwo = ref('');

const handleRegister = async ()=>{
  if(username.value === "" || password.value === "" || password.value === ""){
    message.value = "Invalid username or password";
    username.value = '';
    password.value = '';
    passwordTwo.value = '';
    return;
  }else if(password.value != passwordTwo.value){
    message.value = "Inconsistent password";
    password.value = '';
    passwordTwo.value = '';
    return;
  }
  message.value = '';
  userStore.error = null;   // 清除错误
  await userStore.handleRegister(username.value, password.value, passwordTwo.value);

  if(userStore.error){
    message.value = userStore.error;
  }else{
    message.value = 'Successfully registered!';
    username.value = '';
    password.value = '';
    passwordTwo.value = '';
  }
}

</script>

<template>
  <h1>这是注册页面</h1>
  <!-- 显示消息 -->
  <div v-if="message" class="message" :class="{ error: userStore.error }" style="color: red">
    {{ message }}
  </div>

  <form @submit.prevent="handleRegister" class="register-form">
    <div class="register-username">
      <label for="username">Username: </label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
        autocomplete="username"
      >
    </div>

    <div class="register-password">
      <label for="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        autocomplete="new-password"
      >
    </div>

    <div class="register-confirm-password">
      <label for="password-two">Confirm your password: </label>
      <input
        type="password"
        id="password-two"
        v-model="passwordTwo"
        required
        autocomplete="new-password"
      >
    </div>

    <button type="submit">Register</button>
  </form>
</template>
<style>

</style>
