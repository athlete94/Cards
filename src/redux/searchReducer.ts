type InitialStateType = typeof initialState
let initialState = {
    searchText: '',
    paramsSlider: [0, 100] as number[],
    handler: 0, // изменяется при отпускании слайдера
    sortPacks: '0updated'
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
        case 'SET_HANDLER':
            return {
                ...state,
                handler: action.handler
            }
        case 'SET_SORT':
            return {
                ...state,
                sortPacks: action.sort
            }
        default:
            return state
    }
}

export type SearchReducerActionType = SetSearchType | SetSliderParamsType | SetHandlerType | SetSortType

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

export type SetHandlerType = ReturnType<typeof setHandler>
export const setHandler = (handler: number) => {
    return {
        type: 'SET_HANDLER',
        handler
    }as const
}
type SetSortType = ReturnType<typeof setSort>
export const setSort = (sort: string) => {
    debugger
    return {
        type: 'SET_SORT',
        sort
    } as const
}