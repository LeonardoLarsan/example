import { User } from '../../models/User'
import { UsersApiResponse } from '../../pages/api/users'
import apiClient from '../../utils/apiClientUtil'
import { getClientConfig } from '../../utils/apiConfigUtil'

export const fetchUserListRequest = async (currentPage: number) => {
  const response = await apiClient.get<UsersApiResponse>(`/api/users?page=${currentPage}`, getClientConfig())
  return response
}

export const updateUserRequest = async (user: User) => {
  const response = await apiClient.put<UsersApiResponse>(`/api/users/${user.id}`, user, getClientConfig())
  return response
}