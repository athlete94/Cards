import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./CardsList.module.css";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Search} from "../Search/Search";
import {useCallback, useEffect} from "react";
import {CardsListTable} from "./CardListItem/CardsListTable";
import {
    addNewCardTC,
    getCardsTC,
    setSearchQueryByAnswerAC,
    setSearchQueryByQuestionAC
} from "../../redux/cardListReducer";
import {useNavigate, useParams} from "react-router-dom";
import {NewCardDataType} from "../../api/cardsApi";
import {Button} from "@material-ui/core";
import {PATH} from "../../App";
import useDebounce from "../../common/hooks/useDebounce";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";


export const CardsList = () => {
    const cardQuestion = useAppSelector(state => state.cardsList.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cardsList.cardAnswer)

    const urlParams = useParams<'cardPackID'>();
    const navigate = useNavigate()
    const cardsPack_ID = urlParams.cardPackID;

    const dispatch = useTypedDispatch()

    const debouncedSearchQuestion = useDebounce(cardQuestion, 500);
    const debouncedSearchAnswer = useDebounce(cardAnswer, 500);

    useEffect(() => {
        if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
    }, [debouncedSearchQuestion, debouncedSearchAnswer])

    const addCardHandler = useCallback(() => {
        const newCard: NewCardDataType = {
            cardsPack_id: cardsPack_ID as string,
            question: 'Added new question',
            answer: 'Added new answer',
        };
        dispatch(addNewCardTC(newCard));

    }, [dispatch, cardsPack_ID]);

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
                    <span className={s.text}
                          onClick={() => navigate(PATH.PACKS)}>
                       ⬅ Pack name
                    </span>
                <div>
                    <Search label={'Search'}
                            width={'100%'}
                            callback={searchHandler}
                            value={valueSearch}/>
                </div>
                <div>

                    <FormLabel id="demo-controlled-radio-buttons-group">Search by</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={valueRadio}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="question" control={<Radio/>} label="Question"/>
                        <FormControlLabel value="answer" control={<Radio/>} label="Answer"/>
                    </RadioGroup>
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


