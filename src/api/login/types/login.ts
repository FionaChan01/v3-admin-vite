export interface ILoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  verifyCodeActual: string
}

export interface ITokenData {
  token: string | undefined
}

export type LoginCodeResponseData = string

export type LoginResponseData = IApiResponseData<{ token: string }>

export type UserInfoResponseData = IApiResponseData<{ username: string; role: string }>
