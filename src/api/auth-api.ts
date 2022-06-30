import axios from "axios";
import {FormLoginType} from "../components/Login/Login";

export const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authApi = {
    login(payload:FormLoginType){
        return instance.post<ResponseUserDataLogin>('auth/login', payload)
    },
    auth(){
        return instance.post('auth/me', {})
    }
}


type ResponseUserDataLogin = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

