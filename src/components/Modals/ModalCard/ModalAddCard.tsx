import {TextField} from '@mui/material';
import React from 'react';
import {GeneralModal} from "../GeneralModal";
import {Button} from "@material-ui/core";



export const ModalAddCard = () => {

    return (
        <GeneralModal>
            <div>
                <h2>Card Info</h2>
                <div>
                    <TextField id="standard-basic"
                               label="Question"
                               variant="standard"
                               //value={questionValue}
                    />
                </div>
                <div>
                    <TextField id="standard-basic"
                               label="Answer"
                               variant="standard"
                               //value={answerValue}
                    />
                </div>
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}
                >
                    Cancel
                </Button>
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}
                >
                    Save
                </Button>
            </div>
        </GeneralModal>
    );
}
