import {AppThunkType} from "./store";
import {ForgotDataType, passwordApi} from "../api/password-api"
import {setInitialized, setStatus} from "./authReducer";

type InitStateType = typeof initState;
type redirectActionType = ReturnType<typeof redirectAC>;
type setPasswordErrorActionType = ReturnType<typeof setPasswordErrorAC>;
export type PasswordRecoveryActionsType = redirectActionType | setPasswordErrorActionType;

const REDIRECT_TO_SEND_MESSAGE_PAGE = "passwordRecovery/REDIRECT_TO_SEND_MESSAGE_PAGE"

const initState = {
    info: '',
    error: null as null | string,
    enteredEmail: '',
};

export const recoveryPasswordReducer = (state: InitStateType = initState, action: PasswordRecoveryActionsType): InitStateType => {
    switch (action.type) {
        case REDIRECT_TO_SEND_MESSAGE_PAGE:
            return {...state, enteredEmail: action.enteredEmail};
        case "passwordRecovery/SET-ERROR":
            return {...state, error: action.value};
        default:
            return state;
    }
};

export const setPasswordErrorAC = (value: null | string) => ({type: "passwordRecovery/SET-ERROR", value} as const);
export const redirectAC = (enteredEmail: string) => ({
    type: REDIRECT_TO_SEND_MESSAGE_PAGE,
    enteredEmail
} as const);

export const recoveryPasswordTC = (data:ForgotDataType)
    : AppThunkType => (dispatch) => {
    dispatch(setStatus('loading'));
    passwordApi.forgot(data)
        .then(() => {
            dispatch(redirectAC(data.email))
            dispatch(setStatus('succeeded'));
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setPasswordErrorAC(error));
        })
        .finally(() => {
            dispatch(setInitialized(true))
        });
};







