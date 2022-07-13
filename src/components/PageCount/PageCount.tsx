import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useTypedDispatch} from "../../redux/store";
import {setPageCount} from "../../redux/packs-reducer";

type BasicSelectPropsType = {
    pageCount: number
}

export default function BasicSelect({pageCount}: BasicSelectPropsType) {
    let dispatch = useTypedDispatch()

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as number);
    // };
    console.log(pageCount)
    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setPageCount(Number(event.target.value)));

    };

    return (
        <Box sx={{ minWidth: 100}}>
            <FormControl variant='outlined' size='small'  fullWidth>
                <InputLabel id="demo-simple-select-label">Page count</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={String(pageCount)}
                    label="Page count"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
