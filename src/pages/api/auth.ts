import { NextApiHandler } from "next"
import timer from "../../utils/timer"

const validToken = 'QpwL5tke4Pnpja7X4'

export interface LoginApiRequest {
    email: string
    password: string
}

export interface LoginApiResponse {
    token: string    
}

export const authApiController = async (token: string): Promise<boolean> => {
    await timer(300)
    return token === validToken
}

const authApiHandler: NextApiHandler = async (request, response) => {
    if(request.method === 'GET') {
        
        // await authApiController()
        // const body: LoginApiRequest = request.body
        // response.json(usersApiResponse.data)
        return 
    }
}



export default authApiHandler