export type ProfileInitialStateType = typeof ProfileInitialState

let ProfileInitialState = {}

export const ProfileReducer = (state: ProfileInitialStateType = ProfileInitialState, action: ActionsProfileType ): ProfileInitialStateType => {
    return state
};

export type ActionsProfileType ={
    type:''
}
