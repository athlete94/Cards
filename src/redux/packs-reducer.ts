import {AppThunkType} from "./store";
import {setStatus} from "./authReducer";
import {packsApi} from "../api/packs-api";
import {setErrorAC} from "./registrationReducer";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}


export const packsReducer = (state: PacksStateType = initialState, action: ActionsPacksType) => {
    switch (action.type) {
        case'SET-CARDS':
            return {
                ...action.payload
            }
        case 'SET_PAGE_COUNT':
            return {
                ...state,
                pageCount: action.pageCount
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page
            }

        default:
            return state
    }
}

const setCardsAll = (payload: PacksStateType) => {

    return {
        type: 'SET-CARDS',
        payload
    } as const
}

export const setPageCount = (pageCount: number) => {
    return {
        type: 'SET_PAGE_COUNT',
        pageCount
    } as const
}
export const setPage = (page: number) => {
    return {
        type: 'SET_PAGE',
        page
    } as const
}


export const setCardsAllThunkCreator = (search: string, sliderParams: number[], value: string, sort?: string, page?:number, pageCount?:number): AppThunkType => (dispatch, getState) => {
    dispatch(setStatus('loading'))
    if (value === "All") {
        packsApi.getPacks(sliderParams, search, '', sort, page, pageCount).then((res) => {
            dispatch(setCardsAll(res.data))
            dispatch(setStatus('succeeded'))
        }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setStatus('failed'))
            throw Error(error)
        })
    } else if (value==='My'){
        let userId = getState().profile._id;

        if (userId != null) packsApi.getPacks(sliderParams, search, userId, sort, page, pageCount)
            .then((res) => {
                dispatch(setCardsAll(res.data))
                dispatch(setStatus('succeeded'))
            }).catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setStatus('failed'))
                throw Error(error)
            })
        // .finally(() => {
        //     dispatch(setStatus('succeeded'))
        // })
    }
}

export const addPickToState = (newPack:string, allOrMyPacks:string): AppThunkType => (dispatch, getState) => {
    let {page, pageCount} = getState().picks
    let {sortPacks, searchText, paramsSlider} = getState().search
    if (allOrMyPacks === 'All') {
        dispatch(setStatus('loading'))
        packsApi.addPack(newPack).then(() => {
            packsApi.getPacks(paramsSlider, searchText, '', sortPacks, page, pageCount).then((res) => {
                dispatch(setCardsAll(res.data))
                dispatch(setStatus('succeeded'))
            })
        }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            dispatch(setStatus('failed'))
        })
    } else {
        let userId = getState().profile._id
        dispatch(setStatus('loading'))
        packsApi.addPack(newPack).then(() => {
            packsApi.getPacks([0, 100], '', userId).then((res) => {
                dispatch(setCardsAll(res.data))
                dispatch(setStatus('succeeded'))
            })
        }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            dispatch(setStatus('failed'))
        })
    }
}
export const deletePickToState = (idPack: string, allOrMyPacks: string): AppThunkType => (dispatch, getState) => {
    let userId = getState().profile._id
    let {page, pageCount} = getState().picks
    let {sortPacks, searchText, paramsSlider} = getState().search
    if(allOrMyPacks==="All"){
    dispatch(setStatus('loading'))
    packsApi.deletePick(idPack)
        .then(() => {
            packsApi.getPacks( paramsSlider, searchText, userId, sortPacks, page, pageCount)
                .then((res) => {
                    dispatch(setCardsAll(res.data))
                    dispatch(setStatus('succeeded'))
                })
        }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
        dispatch(setStatus('failed'))
    }) }
    else {
        const userId  = getState().profile._id
        dispatch(setStatus('loading'))
        packsApi.deletePick(idPack)
            .then(() => {
                debugger
                packsApi.getPacks( [0, 100], '',userId)
                    .then((res) => {
                        debugger
                        dispatch(setCardsAll(res.data))
                        dispatch(setStatus('succeeded'))
                    })
            }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            dispatch(setStatus('failed'))
        })
    }
}

export const editPackToState = (idPack: string, newName:string,allOrMyPacks:string): AppThunkType => (dispatch, getState) => {
    let userId = getState().profile._id
    let {page, pageCount} = getState().picks
    let {sortPacks, searchText, paramsSlider} = getState().search

    if(allOrMyPacks==='All') {
        dispatch(setStatus('loading'))
        packsApi.editPack(idPack, newName).then(() => {
            packsApi.getPacks(paramsSlider, searchText, userId, sortPacks, page, pageCount).then((res) => {
                dispatch(setCardsAll(res.data))
                dispatch(setStatus('succeeded'))
            })
        }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            dispatch(setStatus('failed'))
        })
    }else {
        let userId = getState().profile._id
        dispatch(setStatus('loading'))
        packsApi.editPack(idPack,newName).then(() => {
            packsApi.getPacks([0, 100], '', userId).then((res) => {
                dispatch(setCardsAll(res.data))
                dispatch(setStatus('succeeded'))
            })
        }).catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            dispatch(setStatus('failed'))
        })
    }
}


type SetCardsAllType = ReturnType<typeof setCardsAll>
type SetPageCountType = ReturnType<typeof setPageCount>
type SetPageType = ReturnType<typeof setPage>

export type ActionsPacksType = SetCardsAllType | SetPageCountType | SetPageType


export type PacksStateType = typeof initialState

export type CardPacksType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}
