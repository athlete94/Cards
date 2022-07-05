import React, {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {useAppSelector, useTypedDispatch} from '../../redux/store';
import {useNavigate, useParams} from "react-router-dom";
import {
    addNewCardTC,
    getCardsTC,
    setCurrentPageCardsListAC,
    setSearchQueryByAnswerAC,
    setSearchQueryByQuestionAC
} from "../../redux/cardListReducer";
import {CardType, NewCardDataType} from '../../api/cardsApi';
import {CardsListItem} from "./CardListItem/CardListItem";




export const CardsList =() =>{

    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;

    //const user_ID = useAppSelector(state => state.profile.user._id);
    const packUser_ID = useAppSelector((state)=> state.cardsList.packUserId);
    const cards = useAppSelector<Array<CardType>>((state)=> state.cardsList.cards);
    const cardsTotalCount = useAppSelector<number>((state) => state.cardsList.cardsTotalCount);
    const pageSize = useAppSelector<number>((store) => store.cardsList.pageCount);
    const currentPage = useAppSelector<number>((state) => state.cardsList.page);
    const isFetchingCards = useAppSelector<boolean>((state) => state.cardsList.isFetchingCards);
    const cardQuestion = useAppSelector<string>((state) => state.cardsList.cardQuestion);
    const cardAnswer = useAppSelector<string>((state) => state.cardsList.cardAnswer);
    const sortCards = useAppSelector<string>((state) => state.cardsList.sortCards);

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
    }, [dispatch, cardsPack_ID, currentPage, cardQuestion, cardAnswer, sortCards]);

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_ID as string,
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_ID,]);

    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardsListAC(page));
    };

    const searchCardsByQuestion = (value: string) => {
        dispatch(setSearchQueryByQuestionAC(value));
    };

    const searchCardsByAnswer = (value: string) => {
        dispatch(setSearchQueryByAnswerAC(value));
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Question</TableCell>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="center">Grade</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {/*<TableBody>
                    {cards.map(c => {
                        return (
                            <CardsListItem key={c._id} c/>
                        );
                    })}
                </TableBody>*/}
            </Table>
        </TableContainer>
    );
};



