import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./CardsList.module.css";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Search} from "../Search/Search";
import {useCallback, useEffect, useState} from "react";
import {CardsListItem} from "./CardListItem/CardsListItem";
import {addNewCardTC, getCardsTC} from "../../redux/cardListReducer";
import {useNavigate, useParams} from "react-router-dom";
import {CardType, NewCardDataType} from "../../api/cardsApi";
import {Button} from "@material-ui/core";
import {PATH} from "../../App";
import {ModalAddCard} from "../Modals/ModalCard/ModalAddCard";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";


export const CardsList = () => {

    const urlParams = useParams<'cardPackID'>();
    const navigate = useNavigate();
    const cardsPack_ID = urlParams.cardPackID;

    const dispatch = useTypedDispatch()

    const cards = useAppSelector<Array<CardType>>((state) => state.cardsList.cards);
    const packUser_ID = useAppSelector((state) => state.cardsList.packUserId)
    const userId = useAppSelector<string>((state) => state.profile._id);

    useEffect(() => {
        if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
    }, [])

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_ID as string,
            question: 'question',
            answer: 'answer',
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_ID]);


    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                    <span className={s.text}
                          onClick={() => navigate(PATH.PACKS)}>
                       ⬅ Pack name
                    </span>
                <div>
                    <Search label={'🔍Search ...'} width={'100%'}/>
                </div>
                <div className={s.button}>
                    <Button size={'small'}
                            type={"submit"}
                            variant={"contained"}
                            color={"inherit"}
                            onClick={addCardHandler}>
                        Add card
                    </Button>
                    <ModalAddCard/>
                </div>
                <div className={s.table}>
                    <Table sx={{minWidth: 400}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="center">Answer</TableCell>
                                <TableCell align="center">Last Updated</TableCell>
                                <TableCell align="center">Grade</TableCell>
                                {userId === packUser_ID && <TableCell align="center">Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards != [] && cards.map((card) => {
                                return(
                                    <CardsListItem key={card._id} card={card}/>
                                )})}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}


