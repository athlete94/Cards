import React from 'react';
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {setErrorAC} from "../../redux/registrationReducer";
import {Snackbar} from "@material-ui/core";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ErrorSnackbar =() =>{

    const error = useAppSelector(state => state.registration.error)

    const dispatch = useTypedDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(''))
    };

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}


