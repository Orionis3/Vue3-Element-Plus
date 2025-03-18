import request from '@/utils/request'

interface LoginParams {
  username: string
  password: string
}

interface LoginResult {
  token: string
}

export const login = (data: LoginParams) => {
  return request.post<LoginResult>('/api/login', data)
}