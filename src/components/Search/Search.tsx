import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './Search.module.css'
import {Box, TextField} from "@mui/material";

export const Search = () => {
    let [value, setValue] = useState<string>('')

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value.trimStart())
    }

    const setSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {

        }
    }

    return (
        <div className={s.search}>
            <Box
                sx={{
                    width: 720,
                    maxWidth: '100%',
                }}
            >
                <TextField
                    fullWidth
                    id="fullWidth"
                    label="Search"
                    variant="standard"
                    onChange={searchHandler}
                    onKeyPress={setSearch}
                />
            </Box>

        </div>
    );
};

