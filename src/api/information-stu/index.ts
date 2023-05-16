import { request } from "@/utils/service"
import type * as Info from "./types/information-stu"
export function getAllInfo() {
  return request({
    url: "information/all",
    method: "get"
  })
}

export function getInfoById(data) {
  return request({
    url: "information/getInfoById",
    method: "post",
    data
  })
}
