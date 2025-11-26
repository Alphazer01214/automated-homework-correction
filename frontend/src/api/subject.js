// src/api/subject.js
import request from './request'

export const getSubjects = () => {
  return request.get('/subjects')
}
