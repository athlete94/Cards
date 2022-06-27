import {combineReducers, createStore, applyMiddleware} from 'redux'
import {AuthActionsType, authReducer} from "./authReducer";
import {ActionsProfileType, ProfileReducer} from "./profileReducer";
import {testReducer} from "./testReducer";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import {RegistrationActionsType, registrationReducer} from "./registrationReducer";




const reducers = combineReducers({
    login: authReducer,
    profile: ProfileReducer,
    registration: registrationReducer,
    testReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof reducers>

export type AppActionType = AuthActionsType | ActionsProfileType | RegistrationActionsType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//type AppThunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>;