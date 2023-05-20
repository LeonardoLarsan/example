import apiClient from '../../utils/apiClientUtil'
import { getClientConfig } from '../../utils/apiConfigUtil'


export const fetchPostsRequest = async (userId: number) => {
  const response = await apiClient.get<any>(`/api/user-posts/${userId}`, getClientConfig())
  return response
}

export const deletePostRequest = async (postId: number) => {
  const response = await apiClient.del<any>(`/api/posts/${postId}`, getClientConfig())
  return response
}