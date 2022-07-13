import React, {ChangeEvent, useState} from 'react';
import {GeneralModal} from "../GeneralModal";
import Button from "@mui/material/Button";
import { TextField } from '@material-ui/core';

type ModalEditPackType = {
    active: boolean
    setActive: (state: boolean) => void
    editPack: (value:string) => void
    packName: string
}

export const ModalEditPack: React.FC<ModalEditPackType> = (
    {
        active,
        setActive,
        editPack,
        packName,
    }
) => {

    const [editPackName, setEditPackName] = useState(packName)

    const cancelHandler = () => {
        setActive(false);
    }
    const editHandler = () => {
        editPack(editPackName);
        setEditPackName(packName)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setEditPackName(e.currentTarget.value)
    }

    return (
        <GeneralModal visible={active} setVisible={setActive}>
            <h2>Edit Pack</h2>
            <TextField id={'editPack'}
                       label="Edit"
                       value={editPackName}
                       onChange={onChangeHandler}
                       type={'text'}
            />
            <div>
                <Button onClick={cancelHandler}>
                    Cancel
                </Button>
                <Button onClick={editHandler} color="error">
                    Save
                </Button>
            </div>
        </GeneralModal>
    );
};

