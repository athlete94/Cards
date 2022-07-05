type InitialStateType = typeof initialState
let initialState = {
    searchText: '',
    paramsSlider: [0, 100] as number[]
}


export const searchReducer = (state: InitialStateType = initialState, action: SearchReducerActionType): InitialStateType => {
    switch(action.type) {
        case "SET_SEARCH":
            return {
                ...state,
                searchText: action.searchText
            }
        case 'SET_SLIDER_PARAMS':
            return {
                ...state,
                paramsSlider: action.paramsSlider
            }
        default:
            return state
    }
}

export type SearchReducerActionType = SetSearchType | SetSliderParamsType

export type SetSearchType = ReturnType<typeof setSearch>
export const setSearch = (searchText: string) => {
    return {
        type: 'SET_SEARCH',
        searchText
    }as const
}

export type SetSliderParamsType = ReturnType<typeof setSliderParams>
export const setSliderParams = (paramsSlider: number[]) => {
    return {
        type: 'SET_SLIDER_PARAMS',
        paramsSlider
    }as const
}