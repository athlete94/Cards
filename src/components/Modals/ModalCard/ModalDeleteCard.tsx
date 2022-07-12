import React from 'react';
import {GeneralModal} from "../GeneralModal";
import Button from "@mui/material/Button";

type ModalDeleteCardType = {
    active: boolean
    setActive: (state: boolean) => void
    deletePack: () => void
}

export const ModalDeleteCard: React.FC<ModalDeleteCardType> = (
    {
        active,
        setActive,
        deletePack,
    }
) => {

    const cancelHandler = () => {
        setActive(false);
    }
    const deleteHandler = () => {
        deletePack();
    }

    return (
        <GeneralModal visible={active} setVisible={setActive}>
            <h2>Delete Pack</h2>
            <h3>Do you really want to remove? All cards will be excluded from this course.</h3>
            <div>
                <Button onClick={cancelHandler}>
                    Cancel
                </Button>
                <Button onClick={deleteHandler} color="error">
                    Delete
                </Button>
            </div>
        </GeneralModal>
    );
};

