import React, {FC, useState} from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {useAppSelector, useTypedDispatch} from "../../../redux/store";
import {CardType, UpdateCardModelType} from "../../../api/cardsApi";
import {deleteCardTC, updateCardTC} from "../../../redux/cardListReducer";
import Button from "@mui/material/Button";
import {ModalDeleteCard} from "../../Modals/ModalCard/ModalDeleteCard";
import {ModalEditAddCard} from "../../Modals/ModalCard/ModalEditAddCard";


type CardsListItemPropsType = {
    card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {

    const dispatch = useTypedDispatch()
    const userId = useAppSelector<string>((state) => state.profile._id);
    const isFetchingCards = useAppSelector<boolean>((state) => state.cardsList.isFetchingCards)

    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>(card.question)
    const [answer, setAnswer] = useState<string>(card.answer)

    const editCardHandler = () => {
        const cardUpdateModel: UpdateCardModelType = {
            _id: card._id,
            question: question,
            answer: answer,
        };
        dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel));
    };

    const deleteCardHandler = () => {
        dispatch(deleteCardTC(card.cardsPack_id, card._id));
        setActiveDeleteModal(false);
    };
    const deleteButtonHandler = () => {
        setActiveDeleteModal(true);
    };

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">{card.question}</TableCell>
            <TableCell align="center">{card.answer}</TableCell>
            <TableCell align="center">{card.updated}</TableCell>
            <TableCell align="center">{card.grade}</TableCell>
            {card.user_id === userId &&
                <TableCell align="center">
                    <Button onClick={() => setActiveModal(true)} disabled={isFetchingCards} color="inherit">
                        <ModeEditIcon/>
                    </Button>
                    <Button onClick={deleteButtonHandler} disabled={isFetchingCards} color="error">
                        <DeleteIcon/>
                    </Button>
                    <ModalDeleteCard
                        active={activeDeleteModal}
                        setActive={setActiveDeleteModal}
                        deletePack={deleteCardHandler}
                    />
                    <ModalEditAddCard
                        inputAnswer={answer}
                        setInputAnswer={setAnswer}
                        inputQuestion={question}
                        setInputQuestion={setQuestion}
                        active={activeModal}
                        setActive={setActiveModal}
                        setCard={editCardHandler}
                    />
                </TableCell>
            }
        </TableRow>
    );
};

