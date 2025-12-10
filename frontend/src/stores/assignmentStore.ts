// assignmentStore.ts   作业Store

import {reactive} from "vue";
import {submitAssignment, getHistory} from "@/api/assignment";
import router from "@/router"

export const assignmentStore = reactive({
  // user: {user_id, username, role, created_at}
  user: JSON.parse(localStorage.getItem('user')),
  error: null,
  loading: false,
  showDetail: false,
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
  currentAssignmentIndex: 0,

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

  showDetailByIndex(index: number) {
    if(index < 0 || index >= this.questions.length) {
      this.currentAssignmentIndex = -1;
      this.showDetail = false;
      return;
    }
    this.showDetail = true;
    this.currentAssignmentIndex = index;
    console.log(this.currentAssignmentIndex);
    console.log(this.history);
    console.log(this.history[this.currentAssignmentIndex]);
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
      alert(`${this.user.username}'s assignment submitted`)
      this.questions = [{ question: "", student_answer: "" }];
      this.assignments.subject = "";
      await router.push("/history");
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },

  async getHistoryList(){
    this.history = (await  getHistory(this.user.user_id)).data;
    return this.history;
  },

  async getAssignmentDetailById(id: string){
    // 传入assignment id， 返回一个obj


  }
})

