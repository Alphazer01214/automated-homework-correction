
import { ref, reactive } from "vue";
import {getHistoryByUsername, submitEssay} from "@/api/essay.ts";
import router from "@/router";

export const essayStore = reactive({
  user: JSON.parse(localStorage.getItem('user')),
  essay: {
    username: '',
    question: '',
    student_answer: '',
    ground_truth: '',
    model_feedback: '',
    edits: []
  },
  loading: false,
  message: '',


  async handleSubmit() {
    try{
      this.loading = true;
      const data = await submitEssay(this.essay);
      alert(data.message);
      await router.push('/history');
    }catch(err){
      console.log(err);
    }finally {
      this.loading = false;
    }
  }
})
