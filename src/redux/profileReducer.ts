

type ProfileInitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
}

let ProfileInitialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0
}

export const ProfileReducer = (state: ProfileInitialStateType = ProfileInitialState, action: ActionsProfileType ): ProfileInitialStateType => {
    switch(action.type){
        case'SET-USER-DATA':
            return {
        ...state,
            _id: action.payload.data._id,
            email: action.payload.data.email,
            name: action.payload.data.name,
            avatar: action.payload.data.avatar,
            publicCardPacksCount: action.payload.data.publicCardPacksCount,
            }
    }

    return state
};

export type ActionsProfileType = setUserDataACType
export const setUserDataAC = (data: any) => {
    return {
        type: "SET-USER-DATA",
        payload: {data}
    } as const
}

type setUserDataACType = ReturnType<typeof setUserDataAC>
