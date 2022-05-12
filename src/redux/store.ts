import {combineReducers, createStore} from 'redux'
import {authReducer} from "./authReducer";


const reducers = combineReducers({authReducer})

export const store = createStore(reducers)
export type AppRootStateType = ReturnType<typeof reducers>