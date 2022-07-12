import {TextField} from '@mui/material';
import React from 'react';
import {GeneralModal} from "../GeneralModal";
import {Button} from "@material-ui/core";

type ModalEditAddCardType = {
    inputAnswer: string
    setInputAnswer: (value: string) => void
    inputQuestion: string
    setInputQuestion: (value: string) => void
    active: boolean
    setActive: (state: boolean) => void
    setCard: () => void
}

export const ModalEditAddCard: React.FC<ModalEditAddCardType> = (
    {
        inputAnswer,
        setInputAnswer,
        inputQuestion,
        setInputQuestion,
        active,
        setActive,
        setCard
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    };
    const saveHandler = () => {
        setCard();
        setActive(false)
    };

    const handleTextInputQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputQuestion(event.currentTarget.value);
    };

    const handleTextInputAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswer(event.currentTarget.value);
    };

    return (
        <GeneralModal visible={active} setVisible={setActive}>
            <div>
                <h2>Card Info</h2>
                <div>
                    <TextField id="standard-basic"
                               label="Question"
                               variant="standard"
                               value={inputQuestion}
                               onChange={handleTextInputQuestionChange}
                    />
                </div>
                <div>
                    <TextField id="standard-basic"
                               label="Answer"
                               variant="standard"
                               value={inputAnswer}
                               onChange={handleTextInputAnswerChange}
                    />
                </div>
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}
                        onClick={cancelHandler}
                >
                    Cancel
                </Button>
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}
                        onClick={saveHandler}
                >
                    Save
                </Button>
            </div>
        </GeneralModal>
    );
}
