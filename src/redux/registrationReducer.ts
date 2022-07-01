import {registrationApi} from "../api/registration-api";
import {AppThunkType} from "./store";
import {setStatus} from "./authReducer";

type InitStateType = typeof initState;
type SetSuccessActionType = ReturnType<typeof setSuccessAC>;
type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type RegistrationActionsType = SetSuccessActionType | SetErrorActionType;

export type SignUpFormDataType = {
    email: string
    password: string
    confirmPassword: string
};

const initState = {
    success: false,
    error: null as null | string,
};

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionsType): InitStateType => {
    switch (action.type) {
        case "registration/SET-SUCCESS":
            return {...state, success: action.value};
        case "registration/SET-ERROR":
            return {...state, error: action.value};
        default:
            return state;
    }
};

export const setSuccessAC = (value: boolean) =>
    ({type: "registration/SET-SUCCESS", value} as const);
export const setErrorAC = (value: null | string) =>
    ({type: "registration/SET-ERROR", value} as const);

export const registerTC = (formData: SignUpFormDataType): AppThunkType => (dispatch) => {
    const {email, password} = formData;
    dispatch(setStatus('loading'));
    registrationApi.register(email, password)
        .then(response => {
            console.log(response);
            dispatch(setErrorAC(null));
            dispatch(setSuccessAC(true));
        })
        .catch((e)=>{
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error));
        })
        .finally(() => {
            dispatch(setStatus('idle'));
        })
};

