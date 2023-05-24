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
