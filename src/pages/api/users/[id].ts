import type { NextApiHandler } from 'next'
import { getBearerToken } from '../../../utils/apiUtil'
import { authApiController } from '../auth'
import apiClient from '../../../utils/apiClientUtil'
import { User } from '../../../models/User'

const updateUserController = async (user: User)=> {
    const response = await apiClient.put(`https://reqres.in/api/users/${user.id}`, user, {})
    return response
}

const userHandler: NextApiHandler = async (request, response) => {

    const bearerToken = getBearerToken(request.rawHeaders)
    const authResult = await authApiController(bearerToken)

    if(authResult === false) {
        response.status(403).send('')
        return
    }
    
    if(request.method === 'PUT') {
        const userParam: User = request.body
        const updateUserResponse = await updateUserController(userParam)
        response.status(updateUserResponse.status).json(updateUserResponse.data)
        return
    }

    response.status(405).send('')
}




export default userHandler