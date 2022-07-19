import {Box, TextField} from '@mui/material';
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

const style = {
    width: 400,
    maxWidth: '100%',
}

const styleButton = {
    marginTop: '15px',
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

                <Box sx={style}>
                    <div>
                        <TextField fullWidth
                                   id="fullWidth"
                                   label="Question"
                                   variant="standard"
                                   value={inputQuestion}
                                   onChange={handleTextInputQuestionChange}
                        />
                    </div>

                    <div>
                        <TextField fullWidth
                                   id="standard-basic"
                                   label="Answer"
                                   variant="standard"
                                   value={inputAnswer}
                                   onChange={handleTextInputAnswerChange}
                        />
                    </div>
                </Box>

                <Box sx={styleButton}>
                    <Button size={'small'}
                            type={"submit"}
                            variant={"contained"}
                            color={"inherit"}
                            onClick={cancelHandler}
                    >
                        Cancel
                    </Button>

                    <Button sx={{marginLeft: '260px'}}
                            size={'small'}
                            type={"submit"}
                            variant={"contained"}
                            color={"inherit"}
                            onClick={saveHandler}
                    >
                        Save
                    </Button>
                </Box>

            </div>
        </GeneralModal>
    );
}
