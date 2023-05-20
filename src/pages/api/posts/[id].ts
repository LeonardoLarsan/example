import type { NextApiHandler } from 'next'
import apiClient from '../../../utils/apiClientUtil'
import timer from '../../../utils/timer'
import { Post } from '../../../models/Post'
import { getBearerToken } from '../../../utils/apiUtil'
import { authApiController } from '../auth'

export interface getUserPostsResponse {
    token: string    
}

export const deletePostController = async (postId: number) => {
    await timer(300)
    const getUserPostsApiResponse = await apiClient.del<void>(`https://jsonplaceholder.typicode.com/posts/${postId}`, {})
    return getUserPostsApiResponse
}

const PostsHandler: NextApiHandler = async (request, response) => {
    
    const bearerToken = getBearerToken(request.rawHeaders)
    const authResult = await authApiController(bearerToken)

    if(authResult === false) {
        response.status(403).send('')
        return
    }
    
    if(request.method === 'DELETE') {
        const postIdParam = Number(request.query.id)
        const deletePostApiResponse = await deletePostController(postIdParam)
        response.status(deletePostApiResponse.status).json(deletePostApiResponse.data)
        return 
    }

    response.status(405).send('')
}

export default PostsHandler