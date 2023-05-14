import axios, { AxiosResponse } from "axios"
axios.defaults.withCredentials = true
export interface Thesis {
  t_id: number
  t_name: string
  t_category: string
  t_publication_name: string
  t_link: string
  t_review_result: string
  t_publication_date: string // 使用字符串表示日期，例如 '2021-01-01T06:00:00.000+00:00'
  t_corr_author_id: string
  t_author_ids: string
}

// 定义接口返回数据的类型（根据实际接口返回的数据结构定义）
export interface ThesisDisplayAPIResponse {
  data: Thesis[]
  msg: string
  authorNameList: String[]
  corrAuthorList: String[]
}

export const getThesisByStudentId = (studentId: number): Promise<ApiResponse> => {
  const url = "http://localhost:8080/thesis/getThesisByStudentId?id=" + studentId.toString() // 将 'your-api-endpoint' 替换为实际的接口地址

  return axios
    .get(url)
    .then((response: AxiosResponse<ThesisDisplayAPIResponse>) => response.data)
    .catch((error: any) => {
      // 处理错误情况
      console.error("查看我的论文出错", error)
      throw error
    })
}

const apiUrl = "http://localhost:8080/thesis/submitThesis"

// export async function submitThesis(data: any) {
//   try {
//     const response = await axios.post(`${apiUrl}`, data)
//     return response.data
//   } catch (error) {
//     console.error("Error while submitting thesis:", error)
//     throw error
//   }
// }

export async function submitThesis(data: any) {
  try {
    const response = await axios.post(`${apiUrl}`, null, {
      params: data
    })
    return response.data
  } catch (error) {
    console.error("Error while submitting thesis:", error)
    throw error
  }
}
