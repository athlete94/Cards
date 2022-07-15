import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {CardType} from "../../api/cardsApi";
import {getCardsTC, setPageCountAC} from "../../redux/cardListReducer";
import {PATH} from "../../App";
import {getRandomCard} from "../../utils/GetRandomCard/getRandomCardUtils";
import {LearnPage} from "./LearnPage/LearnPage";
import style from "./LearnPageContainer.module.css"

export const LearnPageContainer = () => {

    const urlParams = useParams<"cardPackID">();
    const cardPack_ID = urlParams.cardPackID;
    const dispatch = useTypedDispatch();

    const userId = useAppSelector(state => state.profile._id);
    const cardPackName = useAppSelector<string>(state => state.learn.cardsPackName);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [randomCard, setRandomCard] = useState<CardType>({
        _id: "",
        cardsPack_id: "",
        user_id: "",
        question: "",
        answer: "",
        grade: 0,
        shots: 0,
        created: "",
        updated: "",
    });

    useEffect(() => {
        if (cardPack_ID && isFirstLoad) {
            dispatch(getCardsTC({cardsPack_id: cardPack_ID, pageCount: 1000000}));
            setIsFirstLoad(false);
        }

        if (cards.length > 0) setRandomCard(getRandomCard(cards));

        return () => {
            dispatch(setPageCountAC(5));
        };
    }, [dispatch, cardPack_ID, cards, isFirstLoad]);

    if (!userId) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={style.projectBlock}>
            <div className={style.container}>
                <h2>Learn pack: {cardPackName}</h2>
                {isFetchingCards ?
                    <div>
                        <p>Just a moment, please.</p>
                        <p>Getting random card for You...</p>
                    </div>
                    :
                    <LearnPage card={randomCard}/>
                }
            </div>
        </div>

    );
};

