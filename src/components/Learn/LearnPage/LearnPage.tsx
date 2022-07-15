import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CardType} from '../../../api/cardsApi';
import {useTypedDispatch} from "../../../redux/store";
import {PATH} from "../../../App";
import {gradeCardTC} from '../../../redux/learnReducer';
import {Button} from '@mui/material';
import style from "./LearnPage.module.css"
import {RadioRating} from './RadioRating/RadioRating';
import SendIcon from '@mui/icons-material/Send';

type LearnPagePropsType = {
    card: CardType
};

export const LearnPage: FC<LearnPagePropsType> = ({card}) => {

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];
    const [grade, setGrade] = useState(grades[2]);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const roundedCardGrade = Math.round(card.grade * 100) / 100;

    const cancelHandler = () => {
        navigate(PATH.PACKS);
    };

    const showAnswerHandler = () => {
        setIsAnswered(true);
    };

    const nextHandler = () => {
        const data = {card_id: card._id, grade: grades.indexOf(grade) + 1};
        setIsAnswered(false);
        dispatch(gradeCardTC(data));
    };

    return (
        <div>
            {card._id === "" ?
                <div className={style.cardBlock}>
                    <p>No cards found in this pack</p>
                    <Button onClick={cancelHandler}>Chancel</Button>
                </div>
                :
                <div className={style.cardBlock}>
                    <div className={style.cardInfoBlock}>
                        <div>
                            <div className={style.grade}>Card grade: {roundedCardGrade}</div>
                            <div className={style.shots}>Card shots: {card.shots}</div>
                        </div>
                        <h4>Question:</h4>
                        <p>{card.question}</p>
                        {isAnswered &&
                            <>
                                <h4>Answer:</h4>
                                <p>{card.answer}</p>
                            </>
                        }
                    </div>
                    {isAnswered &&
                        <div className={style.rateBlock}>
                            <h4>Rate yourself:</h4>
                            <RadioRating
                                name={"grade"}
                                options={grades}
                                value={grade}
                                onChangeOption={setGrade}
                            />
                        </div>
                    }
                    <div className={style.buttonsBlock}>
                        <Button onClick={cancelHandler}>Cancel</Button>
                        {isAnswered ?
                            <Button onClick={nextHandler} sx={{marginLeft: '65px'}}>Next</Button>
                            :
                            <Button onClick={showAnswerHandler}
                                    color="success"
                                    endIcon={<SendIcon/>}
                            >Show answer</Button>
                        }
                    </div>
                </div>
            }
        </div>
    );
};
