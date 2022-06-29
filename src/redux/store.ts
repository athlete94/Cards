import {combineReducers, createStore, applyMiddleware, AnyAction} from 'redux'
import {AuthActionsType, authReducer} from "./authReducer";
import {ActionsProfileType, ProfileReducer} from "./profileReducer";
import {testReducer} from "./testReducer";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';


const reducers = combineReducers({
    login: authReducer,
    profile: ProfileReducer,
    testReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof reducers>

export type AppActionType = AuthActionsType | ActionsProfileType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AppActionType>