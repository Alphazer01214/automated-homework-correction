<script setup lang="ts">
import {ref, computed, watch} from 'vue';
import {userStore} from "@/stores/userStore.ts";

const getUserInfo = computed(() => {
  return userStore.user;
})
</script>

<template>
  <h1>用户信息</h1>
  <div class="user-info">
  <!--  (v, k) 是反的， 池沼遍历-->
    <li v-for="(value, key) in userStore.user" :key="key">
      <strong>{{key}}</strong> : {{value}}
    </li>
  </div>
</template>

<style scoped>

</style>
