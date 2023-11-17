export interface IResponse {
    code: number
    message: string
    time: Date
    data: unknown
}

export interface IError {
    code: number
    message: string
    time: Date
    data: Array<object>
}