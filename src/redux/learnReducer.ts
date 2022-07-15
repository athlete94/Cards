import {learnApi, UpdateGradeDataType} from "../api/learnApi";
import {AppThunkType} from "./store";
import {setStatus} from "./authReducer";
import {setIsFetchingCards, updateCardGradeAC} from "./cardListReducer";
import {handleAppRequestError} from "../utils/Error/errorUtils";

type InitialStateType = typeof initialState;
type ActionType = ReturnType<typeof setLearnPackNameAC>;
export type LearnActionType = ActionType;

const initialState = {
    cardsPackName: "",
};

export const learnReducer = (state: InitialStateType = initialState, action: LearnActionType): InitialStateType => {
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

export const gradeCardTC =(data: UpdateGradeDataType): AppThunkType => (dispatch) =>{
    dispatch(setStatus('loading'));
    dispatch(setIsFetchingCards(true));
    learnApi.gradeCard(data)
        .then(data => {
            dispatch(updateCardGradeAC(data.updatedGrade));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setStatus('idle'));
            dispatch(setIsFetchingCards(false));
        });
};
