import {TypedDispatch} from "./store";
import {setStatus} from "./authReducer";
import {packsApi} from "../api/packs-api";
import {setErrorAC} from "./registrationReducer";

const initialState = {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    // paramsSlider: [0, 100] as number[],
    token: '',
    tokenDeathTime: 0,
}


export const packsReducer = (state: PacksStateType=initialState, action: ActionsPacksType) => {
    switch (action.type) {
        case'SET-CARDS':
            return {
        ...state,
                cardPacks:action.payload.cardPacks,
                cardPacksTotalCount:action.payload.cardPacksTotalCount,
                maxCardsCount:action.payload.maxCardsCount,
                minCardsCount:action.payload.minCardsCount,
                page:action.payload.page,
                pageCount:action.payload.pageCount,
            }
        default:
           return state
    }
}

const setCardsAll = (payload:PacksStateType) =>{
    debugger
    return {
        type:'SET-CARDS',
        payload
    } as const
}

export const setCardsAllThunkCreator = (search: string, sliderParams: number[]) =>(dispatch:TypedDispatch)=>{
    dispatch(setStatus('loading'))
    packsApi.getPacks(search, sliderParams).then((res)=>{
        debugger
        dispatch(setCardsAll(res.data))
        dispatch(setStatus('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        // dispatch(setErrorAC(error))
        dispatch(setStatus('failed'))
    })
}

export const addPickToState = ()=>(dispatch:TypedDispatch)=>{
    dispatch(setStatus('loading'))
    packsApi.addPack().then(()=>{
        packsApi.getPacks('',[0, 100]).then((res)=>{
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

export const deletePickToState = (idPack:string)=>(dispatch:TypedDispatch)=>{
    dispatch(setStatus('loading'))
    packsApi.deletePick(idPack).then(()=>{
        packsApi.getPacks('',[0, 100]).then((res)=>{
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
export const editPackToState = (idPack:string)=>(dispatch:TypedDispatch)=>{
    dispatch(setStatus('loading'))
    packsApi.editPack(idPack).then(()=>{
        packsApi.getPacks('',[0, 100]).then((res)=>{
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

type SetCardsAllType = ReturnType<typeof setCardsAll>


export type ActionsPacksType = SetCardsAllType



export type PacksStateType = {
	cardPacks: CardPacksType[];
	page: number;
	pageCount: number;
	cardPacksTotalCount: number;
	minCardsCount: number;
	maxCardsCount: number;
	token: string;
	tokenDeathTime: number;
}
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
