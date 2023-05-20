import type { NextApiHandler } from 'next'
import apiClient from '../../../utils/apiClientUtil'
import timer from '../../../utils/timer'
import { Post } from '../../../models/Post'
import { getBearerToken } from '../../../utils/apiUtil'
import { authApiController } from '../auth'

export interface getUserPostsResponse {
    token: string    
}

export const getUserPostsController = async (userId: number) => {
    await timer(300)
    const getUserPostsApiResponse = await apiClient.get<Array<Post>>(`https://jsonplaceholder.typicode.com/users/${userId}/posts`, {})
    return getUserPostsApiResponse
}

const getUserPostsHandler: NextApiHandler = async (request, response) => {
    
    const bearerToken = getBearerToken(request.rawHeaders)
    const authResult = await authApiController(bearerToken)

    if(authResult === false) {
        response.status(403).send('')
        return
    }
    
    if(request.method === 'GET') {
        const userIdParam = Number(request.query.id)
        const userPostsApiResponse = await getUserPostsController(userIdParam)
        response.status(userPostsApiResponse.status).json(userPostsApiResponse.data)
        return 
    }

    response.status(405).send('')
}

export default getUserPostsHandler