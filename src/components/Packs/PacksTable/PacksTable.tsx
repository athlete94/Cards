import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CardPacksType, deletePickToState, editPackToState} from "../../../redux/packs-reducer";
import {useAppSelector, useTypedDispatch} from "../../../redux/store";
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../App";
import {setLearnPackNameAC} from "../../../redux/learnReducer";
import PackItem from "./PackItem";
import style from './PacksTable.module.css'

type PacksTableType = {
    sort: string
    onClickSortHandler:()=>void
}


export default function PacksTable(props: PacksTableType) {

    const packs = useAppSelector(state => state.picks.cardPacks)

    const cards = useAppSelector(state => state.picks.cardPacks)

    const userId = useAppSelector(state => state.profile._id)


    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePickToState(id))
    }
    const onClickEditHandler = (id: string) => {
        dispatch(editPackToState(id))
    }


    return (
        <TableContainer style={{marginBottom:'20px'}} component={Paper}>
            <Table sx={{minWidth: 400}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center" id='update'>Last Updated {props.sort==='0updated'?'↓':'↑'}</TableCell>
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
