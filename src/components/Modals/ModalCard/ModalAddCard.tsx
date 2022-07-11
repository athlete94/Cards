import { TextField } from '@mui/material';
import React from 'react';
import {GeneralModal} from "../GeneralModal";
import {Button} from "@material-ui/core";


export const ModalAddCard = () => {
    /*const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);*/

    return (
        <GeneralModal>
            <div>
                <h2>Card Info</h2>
                <TextField id="standard-basic" label="Question" variant="standard" />
                <TextField id="standard-basic" label="Answer" variant="standard" />
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}>
                    Cancel
                </Button>
                <Button size={'small'}
                        type={"submit"}
                        variant={"contained"}
                        color={"inherit"}>
                    Save
                </Button>
            </div>
        </GeneralModal>
    );
}

/*
<input>Question<input/>
    <input>Answer<input/>
        <button>Cancel</button>
        <button>Save</button>*/
