import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./CardsList.module.css";
import st from '../../common/style/PaginationBlock.module.css'
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Search} from "../Search/Search";
import {useCallback, useEffect, useState} from "react";
import {CardsListItem} from "./CardListItem/CardsListItem";
import {
    addNewCardTC,
    getCardsTC,
    setSearchQueryByQuestionAC,
    setSearchQueryByAnswerAC, setCurrentPageCardsListAC,
} from "../../redux/cardListReducer";
import {useNavigate, useParams} from "react-router-dom";
import {CardType, NewCardDataType} from "../../api/cardsApi";
import {Button} from "@material-ui/core";
import {PATH} from "../../App";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {ModalEditAddCard} from "../Modals/ModalCard/ModalEditAddCard";
import useDebounce from "../../common/hooks/useDebounce";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import PaginationRounded from "../Pagination/Pagination";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export const CardsList = () => {

    const urlParams = useParams<'cardPackID'>();
    const navigate = useNavigate();
    const cardsPack_ID = urlParams.cardPackID;
    const dispatch = useTypedDispatch()

    const cards = useAppSelector<Array<CardType>>((state) => state.cardsList.cards);
    const packUser_ID = useAppSelector((state) => state.cardsList.packUserId)
    const userId = useAppSelector((state) => state.profile._id);
    const isFetchingCards = useAppSelector(state => state.cardsList.isFetchingCards);
    const cardQuestion = useAppSelector(state => state.cardsList.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cardsList.cardAnswer)
    const {page, pageCount, cardsTotalCount} = useAppSelector(state => state.cardsList)

    //const packsName = useAppSelector<string>((state) => state.picks.name);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [question, setQuestion] = useState<string>("");

    const debouncedSearchQuestion = useDebounce(cardQuestion, 500);
    const debouncedSearchAnswer = useDebounce(cardAnswer, 500);


    useEffect(() => {
        if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
    }, [debouncedSearchQuestion, debouncedSearchAnswer, page, pageCount])

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_ID as string,
            question: question,
            answer: answer,
        };
        dispatch(addNewCardTC(newCard));
    }, [dispatch, cardsPack_ID, question, answer]);

    //radio
    const [valueRadio, setValueRadio] = React.useState('question');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRadio((event.target as HTMLInputElement).value);
    };
    //search
    const searchHandler = (value: string) => {
        valueRadio === 'question' ?
            dispatch(setSearchQueryByQuestionAC(value))
            : dispatch(setSearchQueryByAnswerAC(value))
    }
    const valueSearch = valueRadio === 'question' ? cardQuestion : cardAnswer

    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>

                <Button onClick={() => navigate(PATH.PACKS)}
                        variant="contained"
                        startIcon={<ArrowBackIosIcon/>}>
                    Pack name
                </Button>

                <div>
                    <Search label={'Search by'}
                            width={'100%'}
                            callback={searchHandler}
                            value={valueSearch}/>
                </div>

                <div className={style.radioSearchContainer}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={valueRadio}
                        onChange={handleChange}
                        row={true}
                    >
                        <FormControlLabel value="question" control={<Radio/>} label="Question"/>
                        <FormControlLabel value="answer" control={<Radio/>} label="Answer"/>
                    </RadioGroup>
                </div>

                {userId === packUser_ID &&
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}
                        onClick={() => setActiveModal(true)}
                        disabled={isFetchingCards}>
                    Add card
                </Button>
                }
                <ModalEditAddCard inputAnswer={answer}
                                  setInputAnswer={setAnswer}
                                  inputQuestion={question}
                                  setInputQuestion={setQuestion}
                                  active={activeModal}
                                  setActive={setActiveModal}
                                  setCard={addCardHandler}/>

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
                                return (
                                    <CardsListItem key={card._id} card={card}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                <div  className={st.paginationBlock}>
                    {/*<BasicSelect setCount={(count) => dispatch(setPageCountAC(count))} pageCount={pageCount}/>*/}
                    <PaginationRounded callback={(page) => dispatch(setCurrentPageCardsListAC(page))} count={Math.ceil(cardsTotalCount/pageCount)} page={page} />
                </div>
            </div>
        </div>
    );
}