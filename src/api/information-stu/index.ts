import { request } from "@/utils/service"

export function getAllInfo() {
  return request({
    url: "information/all",
    method: "get"
  })
}
