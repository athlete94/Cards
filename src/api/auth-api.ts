import {FormLoginType} from "../components/Login/Login";
import {instance} from "./instance";

export const authApi = {
    login(payload:FormLoginType){
            return instance.post<ResponseUserDataLogin>('auth/login', payload)
    },
    auth(){
        return instance.post('auth/me')
    },
    logout() {
        return instance.delete('auth/me')
    },
};

export type ResponseUserDataLogin = {
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

