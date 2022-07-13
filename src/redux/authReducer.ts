import {TypedDispatch} from "./store";
import {authApi} from "../api/auth-api";
import {FormLoginType} from "../components/Login/Login";
import {setUserDataAC} from "./profileReducer";


let initialState: AuthStateType = {
    isLogin: false,
    initialized: false,
    status: 'idle',
    allOrMyPacks: 'All',
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
            return {...state, status: action.payload.status};
        case 'SET-ALLORMY':
            return {...state, allOrMyPacks: action.payload.allOrMyPacks}
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
export const setAllOrMyPacks = (allOrMyPacks:string ) => {
    return {
        type: "SET-ALLORMY",
        payload: {allOrMyPacks},
    } as const
}

export const setInitialized = (isInitialized: boolean) => {
    return {
        type: 'SET-INITIALIZE',
        payload: {isInitialized}
    } as const
}

export const setStatus = (status: RequestStatusType) => {
    return {
        type: 'SET-STATUS',
        payload: {status}
    } as const
}

export const authMe = () => (dispatch: TypedDispatch) => {
    dispatch(setStatus('loading'))
    authApi.auth().then((res) => {
        dispatch(isLoginAC(true))
        dispatch(setUserDataAC(res.data))
        dispatch(setStatus('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setStatus('failed'))
        throw Error(error)
    }).finally(() => {
        dispatch(setInitialized(true))

    })
}

export const loginTC = (payload: FormLoginType) => (dispatch: TypedDispatch) => {
    dispatch(setStatus('loading'))
    authApi.login(payload).then((res) => {

        dispatch(setUserDataAC(res.data))
        dispatch(isLoginAC(true))
        sessionStorage.setItem('userId', res.data._id)
        dispatch(setStatus('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setStatus('failed'))
        throw Error(error)
    })
}

export type AuthActionsType = isLoginACType | SetInitializedType | SetStatusType | setAllOrMyPacksType

export const logoutTC = () => (dispatch: TypedDispatch) => {
    authApi.logout()
        .then(() => {
            dispatch(isLoginAC(false))
        }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        throw Error(error)
    })
}

export type SetInitializedType = ReturnType<typeof setInitialized>
export type SetStatusType = ReturnType<typeof setStatus>
type isLoginACType = ReturnType<typeof isLoginAC>
type setAllOrMyPacksType = ReturnType<typeof setAllOrMyPacks>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AllOrMyPacksType = 'All' | 'My'

type AuthStateType = {
    isLogin: boolean
    initialized: boolean
    status: RequestStatusType
    allOrMyPacks: string
}