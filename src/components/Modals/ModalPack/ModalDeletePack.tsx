import React from 'react';
import {GeneralModal} from "../GeneralModal";
import Button from "@mui/material/Button";

type ModalDeletePackType = {
    active: boolean
    setActive: (state: boolean) => void
    deletePack: () => void
    packName:string
}

export const ModalDeletePack: React.FC<ModalDeletePackType> = (
    {
        active,
        setActive,
        deletePack,
        packName,
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
            <h3>{`Do you really want to remove ${packName}?`}</h3>
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

