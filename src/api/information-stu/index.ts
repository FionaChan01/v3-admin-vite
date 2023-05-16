import { request } from "@/utils/service"

export function getAllInfo() {
  return request({
    url: "information/all",
    method: "get"
  })
}

export function getInfoById(data) {
  return request({
    url: "information/getInfoById",
    method: "get",
    data
  })
}
