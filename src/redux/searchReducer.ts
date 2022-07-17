type InitialStateType = typeof initialState
let initialState = {
    searchText: '',
    paramsSlider: [0, 100] as number[],
    touchSlider: false , // изменяется при отпускании слайдера
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
        case 'SET_TOUCH_SLIDER':
            return {
                ...state,
                touchSlider: action.touchSlider
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

export type SearchReducerActionType = SetSearchType | SetSliderParamsType | SetTouchSliderType | SetSortType

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

export type SetTouchSliderType = ReturnType<typeof setTouchSlider>
export const setTouchSlider = (touchSlider: boolean) => {
    return {
        type: 'SET_TOUCH_SLIDER',
        touchSlider
    }as const
}
type SetSortType = ReturnType<typeof setSort>
export const setSort = (sort: string) => {
    return {
        type: 'SET_SORT',
        sort
    } as const
}