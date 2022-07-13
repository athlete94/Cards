import React, {FC, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    visible?: boolean
    setVisible?: (isVisible: boolean) => void
    children?: ReactNode
}

export const GeneralModal: FC<PropsType> = ({visible, setVisible, children}) => {

    const close = () => {
        if (setVisible) {
            setVisible(false)
        }
    }

    return (
        <Modal
            open={visible ? visible : false}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                {children}
            </Box>
        </Modal>
    );
}