import { deleteCookie, getCookie, setCookie } from "./cookieUtil"

const getClientConfig = () => {
    return {
        headers: { Authorization: `Bearer ${getCookie('token')}` }
    }
}

const setToken = (token: string) => {
    setCookie('token', token)
}

const delToken = () => {
    deleteCookie('token')
}

export {
    getClientConfig,
    setToken,
    delToken,
}