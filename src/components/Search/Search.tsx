import React, {ChangeEvent} from 'react';
import s from './Search.module.css'
import {Box, TextField} from "@mui/material";


type SearchPropsType = {
    label: string,
    width: string,
    callback: (value: string) => void
    value: string
}

export const Search = ({label, width, callback, value}: SearchPropsType) => {

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.value.trimStart())
    }

    return (
        <div className={s.search}>
            <Box
                sx={{
                    width: 720,
                    maxWidth: {width},
                }}
            >
                <TextField
                    color="secondary"
                    value={value}
                    fullWidth
                    id="fullWidth"
                    label={label}
                    variant="standard"
                    onChange={onChangeSearch}
                />
            </Box>

        </div>
    );
};

