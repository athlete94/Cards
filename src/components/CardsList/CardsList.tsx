import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import SearchInput from '../../utils/SearchInput/SearchInput';
import s from "./CardsList.module.css";
import MinimumDistanceSlider from "../Slider/Slider";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {addPickToState, setCardsAllThunkCreator} from "../../redux/packs-reducer";
import {Search} from "../Search/Search";
import {useCallback, useEffect} from "react";
import useDebounce from "../../common/hooks/useDebounce";
import {CardsListTable} from "./CardListItem/CardsListTable";
import {addNewCardTC, getCardsTC} from "../../redux/cardListReducer";
import {useParams} from "react-router-dom";
import {NewCardDataType} from "../../api/cardsApi";


export  const CardsList = ()=> {

    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;

    const dispatch = useTypedDispatch()

    useEffect(()=> {
        if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
    },[])

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_ID as string,
            question: 'Added new question',
            answer: 'Added new answer',
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_ID]);


    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                    <div>Page name</div>
                    <div>
                        <Search label={'Search ...'} />
                        <button onClick={addCardHandler}>Add card</button>
                    </div>
                    <div>
                        <CardsListTable/>
                    </div>
            </div>
        </div>
    );
}


