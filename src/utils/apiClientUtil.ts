import axios, { AxiosRequestConfig } from 'axios'
import { getCookie, setCookie, deleteCookie } from "./cookieUtil"

const getConfigForClient = () => {
    return {
        headers: { Authorization: `Bearer ${getCookie('token')}` }
    }
}

interface ServiceResponse<Data> {
    status: number
    isError: boolean
    isSuccess: boolean
    data: Data
}

const get = async <Data>(url: string, config: AxiosRequestConfig<any>): Promise<ServiceResponse<Data>> => {
    return axios.get<Data>(url, config)
    .then(response=> {
        return {
            status: response.status,
            isError: false,
            isSuccess: true,
            data: response.data
        }
    })
    .catch(error=>{
        return {
            status: error.response.status,
            isError: true,
            isSuccess: false,
            data: error.response.data
        }
    })
}

const post = async <Data>(url: string, body: any, config: AxiosRequestConfig<any>): Promise<ServiceResponse<Data>> => {
    return axios.post<Data>(url, body, config)
    .then(response=> {
        return {
            status: response.status,
            isError: false,
            isSuccess: true,
            data: response.data
        }
    })
    .catch(error=>{
        return {
            status: error.response.status,
            isError: true,
            isSuccess: false,
            data: error.response.data
        }
    })
}

const put = async <Data>(url: string, body: any, config: AxiosRequestConfig<any>): Promise<ServiceResponse<Data>> => {
    return axios.put<Data>(url, body, config)
    .then(response=> {
        return {
            status: response.status,
            isError: false,
            isSuccess: true,
            data: response.data
        }
    })
    .catch(error=>{
        return {
            status: error.response.status,
            isError: true,
            isSuccess: false,
            data: error.response.data
        }
    })
}

const del = async <Data>(url: string, config: AxiosRequestConfig<any>): Promise<ServiceResponse<Data>> => {
    return axios.delete<Data>(url, config)
    .then(response=> {
        return {
            status: response.status,
            isError: false,
            isSuccess: true,
            data: response.data
        }
    })
    .catch(error=>{
        return {
            status: error.response.status,
            isError: true,
            isSuccess: false,
            data: error.response.data
        }
    })
}

const apiClientUtil = {
    get,
    post,
    put,
    del
}

export default apiClientUtil
