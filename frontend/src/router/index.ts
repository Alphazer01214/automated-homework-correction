// 这是主router，用于管理不同页面的展示

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AssignmentView from "@/views/AssignmentView.vue";
import ResultView from '@/views/ResultView.vue';
import HistoryView from "@/views/HistoryView.vue";
import UserView from "@/views/UserView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/submit',
      name: 'Submit',
      component: AssignmentView
    },
    {
      path: '/history',
      name: 'History',
      component: HistoryView
    },
    {
      path: '/user',
      name: 'Profile',
      component: UserView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ],
})

export default router
