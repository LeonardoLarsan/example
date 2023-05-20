import { LoginApiRequest, LoginApiResponse } from '../../pages/api/login'
import apiClient from '../../utils/apiClientUtil'
import { getClientConfig } from '../../utils/apiConfigUtil'

export const loginRequest = async (loginRequest: LoginApiRequest) => {
  const response = await apiClient.post<LoginApiResponse>(`/api/login`, loginRequest, getClientConfig())
  return response
}