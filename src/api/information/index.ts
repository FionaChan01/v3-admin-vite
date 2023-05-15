import { request } from "@/utils/service"
import type * as Info from "./types/information"

export function submit(data: Info.ISubmitRequestData) {
  return request<Info.ISubmitResponseData>({
    url: "information/submit",
    method: "post",
    data
  })
}
