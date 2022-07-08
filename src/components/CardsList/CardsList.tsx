import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./CardsList.module.css";
import {useTypedDispatch} from "../../redux/store";
import {Search} from "../Search/Search";
import {useCallback, useEffect} from "react";
import {CardsListTable} from "./CardListItem/CardsListTable";
import {addNewCardTC, getCardsTC} from "../../redux/cardListReducer";
import {useNavigate, useParams} from "react-router-dom";
import {NewCardDataType} from "../../api/cardsApi";
import {Button} from "@material-ui/core";
import {PATH} from "../../App";




export  const CardsList = ()=> {

    const urlParams = useParams<'cardPackID'>();
    const navigate = useNavigate()
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
                    <span className={s.text}
                          onClick={()=>navigate(PATH. PACKS)}>
                       ⬅ Pack name
                    </span>
                    <div>
                        <Search label={'🔍Search ...'} width={'100%'} />
                    </div>
                    <div className={s.button}>
                        <Button size={'small'}
                                type={"submit"}
                                variant={"contained"}
                                color={"inherit"}
                                onClick={addCardHandler}>
                            Add card
                        </Button>
                    </div>
                    <div className={s.table}>
                        <CardsListTable/>
                    </div>
            </div>
        </div>
    );
}


