import axios, { AxiosResponse } from "axios"

axios.defaults.withCredentials = true
// 定义接口返回数据的类型（根据实际接口返回的数据结构定义）
export interface StudentInformationAPIResponse {
  data: {
    teacherId: number
    sId: number
    sName: string
    sGender: string
    sEthnicity: string
    sPoliticalStatus: string
    sPhone: string
    sAddress: string
    sIdType: string
    sIdNumber: string
    sGradeYear: number
    sRegistrationStatus: string
    sEnrollmentDate: string
    sPhoto: string
    sGraduateDate: string
    sStudentType: string
    sDegreeType: string
    sPostponedYear: number
    sStudentId: string
    sPwd: string
    sClass: string
    sMajor: string
    sDept: string
    sCampus: string
  }
  mentorName: string
  msg: string
}

export const getStudentInformationById = (id: number): Promise<ApiResponse> => {
  const url = "http://localhost:8080/studentInformation/getStudentInformationById?id=" + id.toString() // 将 'your-api-endpoint' 替换为实际的接口地址

  return axios
    .get(url)
    .then((response: AxiosResponse<StudentInformationAPIResponse>) => response.data)
    .catch((error: any) => {
      // 处理错误情况
      console.error(error)
    })
}
