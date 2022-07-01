import {TypedDispatch} from "./store";
import {authApi} from "../api/auth-api";
import {FormLoginType} from "../components/Login/Login";
import {setUserDataAC} from "./profileReducer";
import {setErrorAC} from "./registrationReducer";


let initialState:AuthStateType = {
    isLogin: false,
    initialized: false,
    status: 'idle'
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case'IS-LOGIN':
            return {
                ...state, isLogin: action.payload.isLogin,
            };
        case 'SET-INITIALIZE':
            return {
                ...state, initialized: action.payload.isInitialized
            };
        case 'SET-STATUS':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

export const isLoginAC = (isLogin: boolean) => {
    return {
        type: "IS-LOGIN",
        payload: {isLogin},
    } as const
}

export const setInitialized = (isInitialized: boolean) => {
    return {
        type: 'SET-INITIALIZE',
        payload: {isInitialized}
    } as const
}

export const setStatus =(status: RequestStatusType)=>{
    return {
        type:'SET-STATUS',
        payload:{status}
    } as const
}

export const authMe = () => (dispatch: TypedDispatch) => {
    dispatch(setStatus('loading'))
    authApi.auth().then(() => {
        dispatch(isLoginAC(true))
        dispatch(setStatus('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
        dispatch(setStatus('failed'))
    }).finally(() => {
        dispatch(setInitialized(true))

    })
}

export const loginTC = (payload: FormLoginType) => (dispatch: TypedDispatch) => {
    dispatch(setStatus('loading'))
    authApi.login(payload).then((res) => {
        dispatch(setUserDataAC(res.data))
        dispatch(isLoginAC(true))
        dispatch(setStatus('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
        dispatch(setStatus('failed'))
    })
}

export type AuthActionsType = isLoginACType | SetInitializedType | SetStatusType

export const logoutTC = () => (dispatch: TypedDispatch) => {
    authApi.logout()
        .then(() => {
        dispatch(isLoginAC(false))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
    })
}

export type SetInitializedType = ReturnType<typeof setInitialized>
export type SetStatusType = ReturnType<typeof setStatus>
type isLoginACType = ReturnType<typeof isLoginAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AuthStateType = {
    isLogin: boolean
    initialized: boolean
    status:RequestStatusType
}