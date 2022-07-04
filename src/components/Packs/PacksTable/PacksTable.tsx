import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deletePickToState, editPackToState, setCardsAllThunkCreator} from "../../../redux/packs-reducer";
import {useEffect} from "react";
import {useAppSelector, useTypedDispatch} from "../../../redux/store";


export default function PacksTable() {

    const dispatch= useTypedDispatch()
    const cards = useAppSelector(state=>state.picks.cardPacks)

    useEffect(()=>{
        debugger
        dispatch(setCardsAllThunkCreator())
    },[])

    const onClickDeleteHandler = (id:string) =>{
        dispatch(deletePickToState(id))
    }
    const onClickEditHandler = (id:string) =>{
        dispatch(editPackToState(id))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="center">Created by</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards!=[] && cards.map((card) => (
                        <TableRow
                            key={card.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{card.name}</TableCell>
                            <TableCell align="center">{card.cardsCount}</TableCell>
                            <TableCell align="center">{card.updated}</TableCell>
                            <TableCell align="center">{card.user_name}</TableCell>
                            <TableCell align="center">
                                <button onClick={()=>{
                                    onClickDeleteHandler(card._id)
                                }}>Delete</button>
                                <button onClick={()=>{
                                    onClickEditHandler(card._id)
                                }}>Edit</button>
                                <button>Learn</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
