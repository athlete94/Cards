import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useTypedDispatch} from "../../redux/store";
import {setPage} from "../../redux/packs-reducer";

type PaginationRoundedPropsType = {
    count: number,
    page: number
}

export default function PaginationRounded({count, page}: PaginationRoundedPropsType) {
    let dispatch = useTypedDispatch()

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    return (
        <Stack spacing={2}>
            <Pagination page={page}
                        count={count}
                        onChange={handleChange}
                        shape="rounded" />
        </Stack>
    );
}
