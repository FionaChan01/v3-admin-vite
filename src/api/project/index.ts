import { request } from "@/utils/service"

export function getAllProjects() {
  return request({
    url: "project/all",
    method: "get"
  })
}

export function getMyProjects() {
  return request({
    url: "project/myProjects",
    method: "get"
  })
}

export function getProjectByStudentId() {
  return request({
    url: "project/getProjectByStudentId",
    method: "get"
  })
}

export function submitProjectApplication(data) {
  return request({
    url: "project/submitProjectApplication",
    method: "post",
    data
  })
}
