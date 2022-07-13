import {AppThunkType} from "./store";
import {setStatus} from "./authReducer";
import {packsApi} from "../api/packs-api";
import {setErrorAC} from "./registrationReducer";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    page: 0,
    pageCount: 0,
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

export const setCardsAllThunkCreator = (search: string, sliderParams: number[], value: string, sort?: string): AppThunkType => (dispatch, getState) => {
    dispatch(setStatus('loading'))
    if (value === "All") {
        debugger
        packsApi.getPacks(sliderParams, search, '', sort).then((res) => {
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
        debugger
        if (userId != null) packsApi.getPacks(sliderParams, search, userId, sort)
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
    if(allOrMyPacks==='All'){
        dispatch(setStatus('loading'))
        packsApi.addPack(newPack).then(() => {
            packsApi.getPacks( [0, 100], '').then((res) => {
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
            packsApi.getPacks( [0, 100], '',userId).then((res) => {
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

export const deletePickToState = (idPack: string, allOrMyPacks:string): AppThunkType => (dispatch, getState) => {
    if(allOrMyPacks==="All"){
        dispatch(setStatus('loading'))
        packsApi.deletePick(idPack)
            .then(() => {
                debugger
                packsApi.getPacks( [0, 100], '')
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
    } else {
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
export const editPackToState = (idPack: string,newName:string,allOrMyPacks:string): AppThunkType => (dispatch, getState) => {
    if(allOrMyPacks==='All'){
        dispatch(setStatus('loading'))
        packsApi.editPack(idPack,newName).then(() => {
            packsApi.getPacks([0, 100], '').then((res) => {
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


export type ActionsPacksType = SetCardsAllType


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
