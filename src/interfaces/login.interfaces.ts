export type TLoginRequest = {
  email: string
  password: string
}

export type TLoginResponse = {
  token: string
  id: string
}
