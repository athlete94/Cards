import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type BasicSelectPropsType = {
    pageCount: number,
    setCount: (count: number) => void
}

export default function BasicSelect({pageCount, setCount}: BasicSelectPropsType) {


    const handleChange = (event: SelectChangeEvent) => {
        setCount(Number(event.target.value))
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
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
