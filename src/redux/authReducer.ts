import {TypedDispatch} from "./store";
import {authApi} from "../api/auth-api";
import {FormLoginType} from "../components/Login/Login";


let initialState = {
    isLogin:false,
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case'IS-LOGIN':
            return {
                ...state, isLogin:action.payload.isLogin,
            };
        case 'SET-USER-DATA':
            return {
                ...state,
                _id:action.payload.data._id,
                email:action.payload.data.email,
                name:action.payload.data.name,
                avatar: action.payload.data.avatar,
                publicCardPacksCount:action.payload.data.publicCardPacksCount,
            }
        default:
            return state
    }
}

export const isLoginAC = (isLogin:boolean) =>{
    return {
        type:"IS-LOGIN",
        payload:{isLogin},
    } as const
}

export const setUserDataAC = (data:any)=>{
    return {
        type:"SET-USER-DATA",
        payload:{data}
    } as const
}

export const loginTC = (payload:FormLoginType) => (dispatch: TypedDispatch) => {
   authApi.login(payload).then((res)=>{
      dispatch(setUserDataAC(res.data))
       dispatch(isLoginAC(true))
   }).catch((e)=>{
       const error = e.response
           ? e.response.data.error
           : (e.message + ', more details in the console');
       alert(error)
   })
}

export type AuthActionsType = isLoginACType | setUserDataACType

type isLoginACType = ReturnType<typeof isLoginAC>
type setUserDataACType = ReturnType<typeof setUserDataAC>

type AuthStateType = {
    isLogin:boolean
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
}