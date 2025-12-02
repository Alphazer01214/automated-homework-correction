// types/index.ts : 定义公用数据格式

// 用户信息（全局共用）
export interface User {
  user_id: string;
  username: string;
  role: string;
  created_at: string;
}

// 题目结构（作业模块专用，也可以放这里）
export interface Question {
  question: string;
  student_answer: string;
}

// 提交作业的完整数据结构
export interface Assignment {
  user_id: string;
  subject: string;
  questions: Question[];
}

// 历史记录
export interface HistoryItem {
  id: string;
  subject: string;
  submit_time: string;
  score?: number;
  feedback?: string;
  questions?: Question[];
}
