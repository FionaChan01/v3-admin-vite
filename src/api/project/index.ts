import axios, { AxiosResponse } from "axios"
axios.defaults.withCredentials = true
export interface Project {
  teacher_id: number
  p_id: number
  p_name: string
  p_type: string
  p_source: string
  p_intro: string
  p_link: string
  p_limit: number
  p_dept: string
  p_current_num: number
}

// export interface Teacher {
//   teacher_id: number
//   teacher_photo_url: string
//   teacher_name: string
//   teacher_gender: string
//   teacher_position: string
//   teacher_phone: string
//   teacher_title: string
//   teacher_office_hours: string
//   teacher_email: string
//   teacher_research_area: string
//   personal_intro_text: string
//   personal_intro_link: string
//   teacher_dept: string
//   teacher_office: string
// }

// 定义接口返回数据的类型（根据实际接口返回的数据结构定义）
export interface ProjectDisplayAPIResponse {
  data: Project[]
  msg: string
  teacherNames: string[]
  // teacher: Teacher[]
}

export const getAllProjects = (): Promise<ApiResponse> => {
  const url = "http://localhost:8080/project/all"
  return axios
    .get(url)
    .then((response: AxiosResponse<ThesisDisplayAPIResponse>) => response.data)
    .catch((error: any) => {
      // 处理错误情况
      console.error("查看项目出错", error)
      throw error
    })
}

export const getProjectByStudentId = (studentId: number): Promise<ApiResponse> => {
  const url = "http://localhost:8080/Project/getProjectByStudentId?id=" + studentId.toString()

  return axios
    .get(url)
    .then((response: AxiosResponse<ThesisDisplayAPIResponse>) => response.data)
    .catch((error: any) => {
      // 处理错误情况
      console.error("查看我的项目出错", error)
      throw error
    })
}

// const apiUrl = "http://localhost:8080/thesis/submitThesis"

// export async function submitThesis(data: any) {
//   try {
//     const response = await axios.post(`${apiUrl}`, null, {
//       params: data
//     })
//     return response.data
//   } catch (error) {
//     console.error("Error while submitting thesis:", error)
//     throw error
//   }
// }
