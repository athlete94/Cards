import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deletePickToState, editPackToState} from "../../../redux/packs-reducer";

import {useAppSelector, useTypedDispatch} from "../../../redux/store";
import {CardType, UpdateCardModelType} from "../../../api/cardsApi";
import {deleteCardTC, updateCardTC} from "../../../redux/cardListReducer";

//"62b9b4a05803e85268e8a67c" id profile

export const CardsListTable= () => {

    const dispatch= useTypedDispatch()
    const userId = useAppSelector<string>(state => state.profile._id);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const packUser_ID = useAppSelector((state)=> state.cardsList.packUserId)


    const onClickDeleteHandler = (cardsPackId: string, cardId: string) =>{
        dispatch(deleteCardTC(cardsPackId, cardId))
    }
    const editCardHandler = (id: string, cardPackId: string) => {
        const cardUpdateModel: UpdateCardModelType = {
            _id: id,
            question:  'New question',
            answer: 'New answer',
        };
        dispatch(updateCardTC(cardPackId, cardUpdateModel));
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
                        {userId === packUser_ID &&<TableCell align="center">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards!=[] && cards.map((card) => {
                       return  <TableRow
                            key={card._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{card.question}</TableCell>
                            <TableCell align="center">{card.answer}</TableCell>
                            <TableCell align="center">{card.updated}</TableCell>
                            <TableCell align="center">{card.grade}</TableCell>

                            {card.user_id === userId &&
                                <TableCell align="center">
                                    <button onClick={() => {
                                        onClickDeleteHandler(card.cardsPack_id, card._id)
                                    }}>Delete
                                    </button>
                                    <button onClick={() => {
                                        editCardHandler(card._id, card.cardsPack_id)
                                    }}>Edit
                                    </button>
                                </TableCell>
                            }
                        </TableRow>
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}