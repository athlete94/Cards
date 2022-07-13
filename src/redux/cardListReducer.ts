import {
    cardsApi,
    CardType, GetCardsQueryParams,
    GetCardsResponseDataType,
    NewCardDataType,
    UpdateCardModelType,
} from "../api/cardsApi";
import {AppRootStateType, AppThunkType} from "./store";
import {setStatus} from "./authReducer";
import {handleAppRequestError} from "../utils/Error/errorUtils";
import {UpdatedGradeType} from "../api/learnApi";


type InitialStateType = typeof initialState
export type CardsListActionsType =
    | ReturnType<typeof setCardsDataAC>
    | ReturnType<typeof updateCardGradeAC>
    | ReturnType<typeof setCurrentPageCardsListAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setIsFetchingCards>
    | ReturnType<typeof setSearchQueryByQuestionAC>
    | ReturnType<typeof setSearchQueryByAnswerAC>
    | ReturnType<typeof setCardsSortDirectionAC>;

const initialState = {
    cards: [] as Array<CardType>,
    packUserId: undefined as undefined | string,
    cardsTotalCount: 0,
    maxGrade: undefined as undefined | number,
    minGrade: undefined as undefined | number,
    page: 1,
    pageCount: 5,
    cardAnswer: "",
    cardQuestion: "",
    sortCards: '0updated',
    isFetchingCards: false,
}


export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListActionsType): InitialStateType => {
    switch (action.type) {
        case "cardsList/SET_CARDS_DATA":
            return {...state, ...action.payload};
        case "cardsList/UPDATE_CARD_GRADE":
            const {card_id, grade, shots} = action.updatedGrade;
            return {
                ...state,
                cards: state.cards.map(c => c._id === card_id ? {...c, grade, shots} : c),
            };
        case"cardsList/SET_CURRENT_PAGE":
            return {...state, page: action.page};
        case "cardsList/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount};
        case "cardsList/SET_IS_FETCHING":
            return {...state, isFetchingCards: action.value};
        case "cardsList/SET_SEARCH_QUERY_BY_QUESTION":
            return {...state, cardQuestion: action.value};
        case "cardsList/SET_SEARCH_QUERY_BY_ANSWER":
            return {...state, cardAnswer: action.value};
        case "cardsList/SET_CARDS_SORT_DIRECTION":
            return {...state, sortCards: action.value};
        default:
            return state;
    }
};

export const setCardsDataAC = (data: GetCardsResponseDataType) =>
    ({type: "cardsList/SET_CARDS_DATA", payload: data} as const);
export const updateCardGradeAC = (updatedGrade: UpdatedGradeType) =>
    ({type: "cardsList/UPDATE_CARD_GRADE", updatedGrade} as const);
export const setCurrentPageCardsListAC = (page: number) =>
    ({type: "cardsList/SET_CURRENT_PAGE", page} as const);
export const setPageCountAC = (pageCount: number) =>
    ({type: "cardsList/SET_PAGE_COUNT", pageCount} as const);
export const setSearchQueryByQuestionAC = (value: string) =>
    ({type: "cardsList/SET_SEARCH_QUERY_BY_QUESTION", value} as const);
export const setSearchQueryByAnswerAC = (value: string) =>
    ({type: "cardsList/SET_SEARCH_QUERY_BY_ANSWER", value} as const);
export const setCardsSortDirectionAC = (value: string) =>
    ({type: "cardsList/SET_CARDS_SORT_DIRECTION", value} as const);
export const setIsFetchingCards = (value: boolean) =>
    ({type: "cardsList/SET_IS_FETCHING", value} as const);


export const getCardsTC = (params: GetCardsQueryParams): AppThunkType => (dispatch,
                                                                          getState: () => AppRootStateType) => {
    const {
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
    } = getState().cardsList;

    const queryParams: GetCardsQueryParams = {
        ...params,
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
    };

    dispatch(setStatus('loading'));
    dispatch(setIsFetchingCards(true));
    cardsApi.getCards(queryParams)
        .then(data => {
            dispatch(setCardsDataAC(data));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setStatus('idle'));
            dispatch(setIsFetchingCards(false));
        });
};


export const addNewCardTC = (newCard: NewCardDataType): AppThunkType => (dispatch) => {
    dispatch(setStatus('loading'));
    cardsApi.createCard(newCard)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: newCard.cardsPack_id}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setStatus('idle'));
        });
};


export const deleteCardTC = (cardsPack_ID: string, card_ID: string): AppThunkType => (dispatch, getState: () => AppRootStateType) => {
    const cardsArrLength = getState().cardsList.cards.length;
    let currentPage = getState().cardsList.page;

    if (cardsArrLength === 1 && currentPage !== 1) {
        currentPage -= 1;
    }

    dispatch(setStatus('loading'));
    cardsApi.deleteCard(card_ID)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID, page: currentPage}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setStatus('idle'));
        });
};


export const updateCardTC = (cardsPack_ID: string, cardModel: UpdateCardModelType): AppThunkType => (dispatch) => {
    dispatch(setStatus('loading'));
    cardsApi.updateCard(cardModel)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setStatus('idle'));
        });
};