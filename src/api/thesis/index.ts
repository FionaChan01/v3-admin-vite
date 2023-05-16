import { request } from "@/utils/service"

export function getThesisByStudentId() {
  return request({
    url: "thesis/getThesisByStudentId",
    method: "get"
  })
}

export function submitThesis(data: any) {
  return request({
    url: "thesis/submitThesis",
    method: "post",
    data
  })
}

// export interface Thesis {
//   t_id: number
//   t_name: string
//   t_category: string
//   t_publication_name: string
//   t_link: string
//   t_review_result: string
//   t_publication_date: string // 使用字符串表示日期，例如 '2021-01-01T06:00:00.000+00:00'
//   t_corr_author_id: string
//   t_author_ids: string
// }

// // 定义接口返回数据的类型（根据实际接口返回的数据结构定义）
// export interface ThesisDisplayAPIResponse {
//   data: Thesis[]
//   msg: string
//   authorNameList: String[]
//   corrAuthorList: String[]
// }
