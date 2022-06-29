import axios from "axios";

export const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    // baseURL:'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const passwordApi = {
    forgot(data:ForgotDataType){
        return instance.post('auth/forgot', data )
    },
}

export type ForgotDataType = {
    email:string
    from: string
    message: string
}
