import { request } from "@/utils/service"

export function display() {
  return request({
    url: "studentInformation/getStudentInformationById",
    method: "get"
  })
}

export function displayTeacher() {
  return request({
    url: "teacherInformation/getTeacherInformationById",
    method: "get"
  })
}

export function submitTeacherInfo(data) {
  return request({
    url: "teacherInformation/submitTeacherInformation",
    method: "post",
    data
  })
}

