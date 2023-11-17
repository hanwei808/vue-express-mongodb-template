import request from '@/utils/request'
import { ILogin, IUsers } from './types/user'

export const getCaptcha = () => {
    return request<{
            code: number
            message: string
            time: Date
            data: Blob
        }>({
        url: '/api/captcha',
        method: 'get'
    })
}

export const login = (data: {
    user: {
        username: string
        password: string
        imgcode: string
    }
}) => {
        return request<{
            code: number
            message: string
            time: Date
            data: ILogin
        }>({
            url: '/api/login',
            method: 'post',
            data
        })
    }

export const register = (data: {
        user: {
            username: string
            email: string
            password: string
            imgcode: string
        }
    }) => {
            return request<{
                code: number
                message: string
                time: Date
                data: ILogin
            }>({
                url: '/api/register',
                method: 'post',
                data
            })
        }

export const users = () => {
    return request<{
        code: number
        message: string
        time: Date
        data: IUsers
    }>({
        url: '/api/users',
        method: 'get'
    })
}

