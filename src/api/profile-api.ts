import {instance} from "./instance";

export const profileApi = {

    updateUserInfo(payload: {name: string, avatar?: string}) {
        return instance.put<ResponceUpdateUserType>('auth/me', payload)
    }
}


export type ResponceUpdateUserType = {
    updatedUser: {
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
    },
    error?: string

}