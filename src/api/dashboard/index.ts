import { request } from "@/utils/service"

export function display() {
  return request({
    url: "studentInformation/getStudentInformationById",
    method: "get"
  })
}
