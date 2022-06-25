import {combineReducers, createStore} from 'redux'
import {AuthActionsType, authReducer} from "./authReducer";
import {ActionsProfileType, ProfileReducer} from "./profileReducer";
import {testReducer} from "./testReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { ThunkDispatch } from 'redux-thunk';


const reducers = combineReducers({
    login: authReducer,
    profile: ProfileReducer,
    testReducer
})

export const store = createStore(reducers)
export type AppRootStateType = ReturnType<typeof reducers>

export type AppActionType = AuthActionsType | ActionsProfileType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector