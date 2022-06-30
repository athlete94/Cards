import {instance} from "./instance";

export const registrationApi = {
    register(email: string,  password: string) {
        return instance.post<any, RegisterResponseType, RegisterRequestType>("auth/register", {email, password})
    },
}

//Type

export type RegisterRequestType = {
    email: string
    password: string
}

export type RegisterResponseType = {
    data: {
        addedUser: {
            created: string
            email: string
            isAdmin: boolean
            name: string
            publicCardPacksCount: number
            rememberMe: boolean
            updated: string
            verified: boolean
            __v: number
            _id: string
        }
        error?: string
    }
}
