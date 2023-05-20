import type { NextApiHandler } from 'next'
import axios from 'axios'
import { getBearerToken } from '../../../utils/apiUtil'
import { authApiController } from '../auth'
import apiClient from '../../../utils/apiClientUtil'
import { User } from '../../../models/User'

export interface UsersApiResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Array<User>
    support: {
        url: string
        text: string
    }
}


export const fetchUsersController = async (page: number)=> {
    const usersApiResponse = await apiClient.get<UsersApiResponse>(`https://reqres.in/api/users?page=${page}`, {})
    return usersApiResponse
}

const usersHandler: NextApiHandler = async (request, response) => {

    const bearerToken = getBearerToken(request.rawHeaders)
    const authResult = await authApiController(bearerToken)

    if(authResult === false) {
        response.status(403).send('')
        return
    }

    if(request.method === 'GET') {
        const { page = '1' } = request.query
        const usersResponse = await fetchUsersController(Number(page))
        response.status(usersResponse.status).json(usersResponse.data)
        return 
    }

    response.status(405).send('')
}

export default usersHandler