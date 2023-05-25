import { request } from "@/utils/service"

export function getThesisByStudentId() {
  return request({
    url: "thesis/getThesisByStudentId",
    method: "get"
  })
}

export function submitThesis(data: any) {
  return request({
    url: "thesis/submitThesis",
    method: "post",
    data
  })
}

export function getStudentThesisByTeacherId() {
  return request({
    url: "thesis/getStudentThesisByTeacherId",
    method: "get"
  })
}

export function approveThesis(data) {
  return request({
    url: "thesis/approveThesis",
    method: "post",
    data
  })
}

export function rejectThesis(data) {
  return request({
    url: "thesis/rejectThesis",
    method: "post",
    data
  })
}
