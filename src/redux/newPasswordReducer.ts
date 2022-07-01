import {AppThunkType} from "./store";
import {setInitialized, setStatus} from "./authReducer";
import {NewPasswordDataType, passwordApi} from "../api/password-api";

type InitStateType = typeof initState
type setNewPasswordSuccessActionType = ReturnType<typeof setNewPasswordSuccessAC>
type setNewPasswordErrorActionType = ReturnType<typeof setNewPasswordErrorAC>
export type NewPasswordActionsType = setNewPasswordSuccessActionType | setNewPasswordErrorActionType

const initState = {
    info: '',
    error: null as null | string,
    success: false,
};

export const newPasswordReducer = (state: InitStateType = initState, action: NewPasswordActionsType): InitStateType => {
    switch (action.type) {
        case SET_NEW_PASSWORD_SUCCESS:
            return {...state, success: action.success};
        case SET_NEW_PASSWORD_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

const SET_NEW_PASSWORD_SUCCESS = "newPassword/SET-NEW-PASSWORD-SUCCESS";
const SET_NEW_PASSWORD_ERROR = "newPassword/SET-NEW-PASSWORD-ERROR";

export const  setNewPasswordSuccessAC = (success: boolean) => ({type:SET_NEW_PASSWORD_SUCCESS, success}) as const
export const setNewPasswordErrorAC = (error:string | null) => ({type: SET_NEW_PASSWORD_ERROR, error})as const

export const setNewPasswordTC = (data:NewPasswordDataType):AppThunkType =>
    (dispatch)=> {
        dispatch(setStatus('loading'));
        passwordApi.updatePassword(data)
            .then(() => {
                dispatch(setStatus('succeeded'));
                dispatch(setNewPasswordSuccessAC(true))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setNewPasswordErrorAC(error));
                dispatch(setStatus('failed'))
            })
            .finally(()=> {
                dispatch(setInitialized(true))
            })
    }