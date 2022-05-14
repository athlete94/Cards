import {combineReducers, createStore} from 'redux'
import {authReducer} from "./authReducer";
import {ProfileReducer} from "./profileReducer";
import {testReducer} from "./testReducer";


const reducers = combineReducers({
    login: authReducer,
    profile: ProfileReducer,
    testReducer
})

export const store = createStore(reducers)
export type AppRootStateType = ReturnType<typeof reducers>