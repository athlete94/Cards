import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CardPacksType} from "../../../redux/packs-reducer";
import {useAppSelector} from "../../../redux/store";

import PackItem from "./PackItem";

type PacksTableType = {
    sort: string
    onClickSortHandler:()=>void
}


export default function PacksTable(props: PacksTableType) {

    const packs = useAppSelector(state => state.picks.cardPacks)

    return (
        <TableContainer style={{marginBottom:'20px'}} component={Paper}>
            <Table sx={{minWidth: 400}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center" id='update' onClick={props.onClickSortHandler} >Last Updated {props.sort==='0updated'?'↓':'↑'}</TableCell>
                        <TableCell align="center">Created by</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.length && packs.map((pack: CardPacksType, index) => (
                        <PackItem pack={pack} key={index}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
