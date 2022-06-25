export type AuthInitialStateType = typeof initialState
let initialState = {}


export const authReducer = (state: AuthInitialStateType  = initialState, action: AuthActionsType): AuthInitialStateType => {
    return state
}


export type AuthActionsType = {
    type:''
}