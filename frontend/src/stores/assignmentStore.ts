// assignmentStore.ts   作业Store

import {reactive} from "vue";
import {submitAssignment, getHistory} from "@/api/assignment";
import router from "@/router"

export const assignmentStore = reactive({
  // user: {user_id, username, role, created_at}
  user: JSON.parse(localStorage.getItem('user')),
  error: null,
  loading: false,
  assignments: {
    // 一份assignment，包括多个questions，用于提交至后端

    user_id: "",
    subject: "",
    questions: [] as Array<{
      question: string;
      student_answer: string;
    }>
  },
  questions: [
    // 临时存放
    {
      question: "",
      student_answer: "",
    }
  ] as Array<{
    question: string;
    student_answer: string;
  }>,
  history: [] as Array<any>,

  addQuestion(){
    this.questions.push({question: "", student_answer: ""});
  },

  removeQuestion(index: number) {
    if(this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
    if(this.questions.length == 1) {
      console.log("Remove but q.len = 1");
      alert("至少要有一题");
    }
  },

  validateForm(){

  },

  async handleSubmit(){
    if (this.questions.some(q => !q.question.trim())) {
      alert("爆了")
      return;
    }
    if (!this.assignments.subject || this.assignments.subject === "null") {
      alert("请选择一个学科！");
      return;
    }
    try{
      this.loading = true;
      this.assignments.user_id = this.user.user_id;
      this.assignments.questions = this.questions;
      const data = await submitAssignment(this.assignments);
      alert(`${data.data.user_id} Assignment Submitted`)
      this.questions = [{ question: "", student_answer: "" }];
      this.assignments.subject = "";
      await router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },

  async getHistoryList(){
    return (await getHistory(this.user.user_id)).data;
  }
})

