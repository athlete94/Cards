import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

type FullWidthTextFieldType ={
    buttonName:string,
    onClickAddItem:()=>void
}



export default function FullWidthTextField(props:FullWidthTextFieldType) {

    const onClickButtonHandler = ()=>{
        props.onClickAddItem()
    }

    return (
        <Box
            sx={{
                width: 300,
                maxWidth: '100',
                display:'flex',
            }}
        >
            <TextField fullWidth label="Search" id="fullWidth"  />
            <Button variant="contained" onClick={onClickButtonHandler}>{props.buttonName}</Button>
        </Box>
    );
}
