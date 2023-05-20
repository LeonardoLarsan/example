import type { NextApiHandler } from 'next'
import axios from 'axios'
import apiClient from '../../utils/apiClientUtil'

export interface LoginApiRequest {
    email: string
    password: string
}

export interface LoginApiResponse {
    token: string    
}
// Todo: falta el controlador
const loginHandler: NextApiHandler = async (request, response) => {
    if(request.method === 'POST') {
        const body: LoginApiRequest = request.body
        const usersApiResponse = await apiClient.post<LoginApiResponse>('https://reqres.in/api/login', body, {})
        response.status(usersApiResponse.status).json(usersApiResponse.data)
        return 
    }

    response.status(405).send('')
}

export default loginHandler