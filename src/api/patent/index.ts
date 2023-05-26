import { request } from "@/utils/service"

export function getPatentByStudentId() {
  return request({
    url: "patent/getPatentByStudentId",
    method: "get"
  })
}

export function submitPatent(data: any) {
  return request({
    url: "patent/submitPatent",
    method: "post",
    data
  })
}

export function getStudentPatentByTeacherId() {
  return request({
    url: "patent/getStudentPatentByTeacherId",
    method: "get"
  })
}

export function approvePatent(data) {
  return request({
    url: "patent/approvePatent",
    method: "post",
    data
  })
}

export function rejectPatent(data) {
  return request({
    url: "patent/rejectPatent",
    method: "post",
    data
  })
}
