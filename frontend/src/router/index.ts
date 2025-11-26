// 这是主router，用于管理不同页面的展示

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ResultView from '@/views/ResultView.vue';
import SubmitAssignment from "@/views/SubmitAssignment.vue";
import HistoryView from "@/views/HistoryView.vue";

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
      component: SubmitAssignment
    },
    {
      path: '/history',
      name: 'History',
      component: HistoryView
    }
  ],
})

export default router
