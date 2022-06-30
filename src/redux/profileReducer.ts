import {profileApi, ResponceUpdateUserType} from "../api/profile-api";
import {AppThunkType} from "./store";


type ProfileInitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
}

let ProfileInitialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0
}

export const ProfileReducer = (state: ProfileInitialStateType = ProfileInitialState, action: ActionsProfileType): ProfileInitialStateType => {
    switch (action.type) {
        case'SET-USER-DATA':
            return {
                ...state,
                _id: action.payload.data._id,
                email: action.payload.data.email,
                name: action.payload.data.name,
                avatar: action.payload.data.avatar,
                publicCardPacksCount: action.payload.data.publicCardPacksCount,
            }
        case 'UPDATE-USER-DATA':
            return {
                ...state,
                ...action.payload.updatedUser
            }
    }

    return state
};

export type ActionsProfileType = SetUserDataACType | UpdateUserDataType

type SetUserDataACType = ReturnType<typeof setUserDataAC>
export const setUserDataAC = (data: any) => {
    return {
        type: "SET-USER-DATA",
        payload: {data}
    } as const
}

type UpdateUserDataType = ReturnType<typeof updateUserData>
export const updateUserData = (data: ResponceUpdateUserType) => {
    return {
        type: 'UPDATE-USER-DATA',
        payload: data
    }as const
}


export const updateUserDataTC = (name: string, avatar?: string): AppThunkType => dispatch => {
    profileApi.updateUserInfo({name, avatar})
        .then(res => {
            debugger
            dispatch(updateUserData(res.data))
        })
        .catch (e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
}



