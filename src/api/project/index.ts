import { request } from "@/utils/service"

export function getAllProjects() {
  return request({
    url: "project/all",
    method: "get"
  })
}

export function getProjectByStudentId() {
  return request({
    url: "project/getProjectByStudentId",
    method: "get"
  })
}
