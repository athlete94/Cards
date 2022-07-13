import React, {ChangeEvent, useState} from 'react';
import {GeneralModal} from '../GeneralModal'
import {TextField} from "@material-ui/core";
import {Button} from "@mui/material";

type ModalAddPackType = {
    active: boolean
    setActive: (state: boolean) => void
    addPack: (value:string) => void
}

export const ModalAddPack: React.FC<ModalAddPackType> = (
    {
        active,
        setActive,
        addPack,
    }
) => {

    const [newPack, setNewPack] = useState('')

    const cancelHandler = () => {
        setActive(false);
    }
    const deleteHandler = () => {
        addPack(newPack);
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewPack(e.currentTarget.value)
    }

    return (
        <GeneralModal visible={active} setVisible={setActive}>
            <TextField id={'addPack'}
                       label="Add new pack"
                       value={newPack}
                       onChange={onChangeHandler}
                       type={'text'}
            />
            <div>
                <Button onClick={cancelHandler}>
                    Cancel
                </Button>
                <Button onClick={deleteHandler} color="error">
                    Save
                </Button>
            </div>
        </GeneralModal>
    );
};

