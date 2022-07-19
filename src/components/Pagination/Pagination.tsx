import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


type PaginationRoundedPropsType = {
    count: number,
    page: number,
    callback: (page: number) => void
}

export default function PaginationRounded({count, page, callback}: PaginationRoundedPropsType) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        callback(value);
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
