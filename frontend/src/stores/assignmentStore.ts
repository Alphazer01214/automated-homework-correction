// assignmentStore.ts   作业Store

import {reactive, ref} from "vue";
import {submitAssignment, getHistory, deleteAssignment} from "@/api/assignment";
import router from "@/router"
export const assignmentStore = reactive({
  // user: {user_id, username, role, created_at}
  user: ref(JSON.parse(localStorage.getItem('user')) || null),
  error: null,
  loading: false,
  showDetail: false,

  // assignment
  assignments: JSON.parse(localStorage.getItem("assignments")) || {
    user_id: "",
    subject: "",
    questions: [] as Array<{
      question: string;
      student_answer: string;
    }>
  },

  // 临时 questions
  questions: JSON.parse(<string>localStorage.getItem("questions")) || [
    {
      question: "",
      student_answer: "",
    }
  ] as Array<{
    question: string;
    student_answer: string;
  }>,

  // history
  history: JSON.parse(<string>localStorage.getItem("history")) || [] as Array<any>,

  currentAssignmentIndex: 0,

  // ------------------------------------------------------------
  // 添加题目
  // ------------------------------------------------------------
  addQuestion() {
    this.questions.push({ question: "", student_answer: "" });
    localStorage.setItem("questions", JSON.stringify(this.questions));
  },

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
      localStorage.setItem("questions", JSON.stringify(this.questions));
      return;
    }
    if (this.questions.length == 1) {
      console.log("Remove but q.len = 1");
      alert("至少要有一题");
    }
  },

  // ------------------------------------------------------------
  // history detail
  // ------------------------------------------------------------
  showDetailByIndex(index: number) {
    if (index < 0 || index >= this.history.length) {
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

  // ------------------------------------------------------------
  // submit assignment
  // ------------------------------------------------------------
  async handleSubmit() {
    if (this.questions.some(q => !q.question.trim())) {
      alert("爆了");
      return;
    }
    if (!this.assignments.subject || this.assignments.subject === "null") {
      alert("请选择一个学科！");
      return;
    }
    try {
      this.loading = true;
      this.assignments.user_id = this.user.user_id;
      this.assignments.questions = this.questions;

      // 写入 localStorage（提交前）
      localStorage.setItem("assignments", JSON.stringify(this.assignments));

      const data = await submitAssignment(this.assignments);

      alert(`${this.user.username}'s assignment submitted`);

      this.questions = [{ question: "", student_answer: "" }];
      this.assignments.subject = "";

      // 提交后清空 localStorage
      localStorage.setItem("questions", JSON.stringify(this.questions));
      localStorage.setItem("assignments", JSON.stringify(this.assignments));

      await router.push("/history");
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },

  // ------------------------------------------------------------
  // get history
  // ------------------------------------------------------------
  async getHistoryList() {
    try {
      this.loading = true;
      this.history = (await getHistory(this.user.user_id)).data;

      // 写入 localStorage
      localStorage.setItem("history", JSON.stringify(this.history));

    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }

    return this.history;
  },

  async getAssignmentDetailById(id: string) {
    // 按需补
  },

  async deleteAssignmentById(id: string){
    try{
      this.loading = true;
      await deleteAssignment(id);
      // this.history = await getHistory(this.user.user_id).data;
      // localStorage.setItem("history", JSON.stringify(this.history));
      await router.push('/history');
      window.location.reload();
    } catch (err: any){
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
});


