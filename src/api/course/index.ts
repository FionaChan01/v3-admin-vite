import { request } from "@/utils/service"

export function getAllCourses() {
  return request({
    url: "course/display",
    method: "get"
  })
}

export function getFilteredCourses(data) {
  return request({
    url: "course/filterDisplay",
    method: "post",
    data
  })
}

export function enrollCourse(data) {
  return request({
    url: "course/enroll",
    method: "post",
    data
  })
}

export function withdrawCourse(data) {
  return request({
    url: "course/withdraw",
    method: "post",
    data
  })
}


