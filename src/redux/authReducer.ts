import {TypedDispatch} from "./store";
import {authApi} from "../api/auth-api";
import {FormLoginType} from "../components/Login/Login";
import {setUserDataAC} from "./profileReducer";


let initialState = {
    isLogin: false,
    initialized: false,
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
            }
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

export const authMe = () => (dispatch: TypedDispatch) => {
    authApi.auth()
        .then((res) => {
            dispatch(setUserDataAC(res.data))

            }).catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more de   tails in the console');
                alert(error)
        }).finally(() => {
        dispatch(setInitialized(true))

    })
}

export const loginTC = (payload: FormLoginType) => (dispatch: TypedDispatch) => {
    authApi.login(payload).then((res) => {
        dispatch(setUserDataAC(res.data))
        dispatch(isLoginAC(true))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        alert(error)
    })
}

export const logoutTC = () => (dispatch: TypedDispatch) => {
    authApi.logout()
        .then(() => {
        dispatch(isLoginAC(false))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
    })
}

export type SetInitializedType = ReturnType<typeof setInitialized>
export type AuthActionsType = isLoginACType | SetInitializedType

type isLoginACType = ReturnType<typeof isLoginAC>

type AuthStateType = {
    isLogin: boolean
    initialized: boolean
}