import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    // baseURL:'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const passwordApi = {
    forgot(data: ForgotDataType){
        return instance.post<ForgotDataType, AxiosResponse<RecoverResponseType>>('auth/forgot', data)
    },
    updatePassword(data: NewPasswordDataType){
        return instance.post<NewPasswordResponseType, AxiosResponse<NewPasswordResponseType>>(`auth/set-new-password`, data)
    }
}

//types

export type NewPasswordResponseType = {
    info: string
}

export type NewPasswordDataType = {
    password: string
    resetPasswordToken: any
}

export type ForgotDataType = {
    email:string
    from: string
    message: string
}

export type RecoverResponseType = {
    answer: boolean,
    html: boolean,
    info: string,
    success: boolean
}
