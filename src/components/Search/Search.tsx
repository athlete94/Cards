import React, {ChangeEvent} from 'react';
import s from './Search.module.css'
import {Box, TextField} from "@mui/material";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {setSearch} from "../../redux/searchReducer";
import useDebounce from "../../common/hooks/useDebounce";

type SearchPropsType = {
    label: string,
    width:string,
}

export const Search = ({label, width}: SearchPropsType) => {
    let value = useAppSelector(state => state.search.searchText)



    let dispatch = useTypedDispatch()

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.currentTarget.value.trimStart()))
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
                    onChange={searchHandler}
                />
            </Box>

        </div>
    );
};

