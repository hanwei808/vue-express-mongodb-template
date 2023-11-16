import request from '@/utils/request'
import { ILoginResponse, IUsersResponse } from './types/user'

export const getCaptcha = () => {
    return request<Blob>({
        url: '/api/captcha',
        method: 'get',
        responseType: 'blob'
    })
}

export const login = (data: {
    user: {
        username: string
        password: string
        imgCode: string
    }
}) => {
        return request<ILoginResponse>({
            url: '/api/login',
            method: 'post',
            data
        })
    }

export const users = () => {
    return request<IUsersResponse>({
        url: '/api/users',
        method: 'get'
    })
}

