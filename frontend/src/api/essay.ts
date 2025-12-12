import axios from './request'

export function submitEssay(payload) {
  // payload = { username, question, student_answer, ground_truth, edits(Array<Object>) }
  return axios.post("/essay/submit", payload)
}

export function getHistoryByUsername(username) {
  return axios.get('/essay/history', {
    params: {
      username: username
    }
  })
}
