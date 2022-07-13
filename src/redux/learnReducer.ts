type InitialStateType = typeof initialState;
type ActionType = ReturnType<typeof setLearnPackNameAC>;
export type LearnActionType = ActionType;

const initialState = {
    cardsPackName: "",
};

export const LearnReducer = (state: InitialStateType = initialState, action: LearnActionType): InitialStateType => {
    switch (action.type) {
        case "learn/SET-LEARN-PACK-DATA":
            return {...state, cardsPackName: action.cardsPackName}
        default:
            return state;
    }
};

export const setLearnPackNameAC = (cardsPackName: string) => ({
    type: "learn/SET-LEARN-PACK-DATA", cardsPackName
} as const)

