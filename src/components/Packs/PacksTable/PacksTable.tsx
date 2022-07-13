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
import {NavLink} from "react-router-dom";

type PacksTableType = {
    sort: string
}


export default function PacksTable(props: PacksTableType) {

    const dispatch = useTypedDispatch()


    const cards = useAppSelector(state => state.picks.cardPacks)
    const userId = useAppSelector(state => state.profile._id)

    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePickToState(id))
    }
    const onClickEditHandler = (id: string) => {
        dispatch(editPackToState(id))
    }

    // let up = document.getElementById("update")
    // if(up!=null) up.addEventListener('click', ()=>{
    //
    // })
    //
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
                    {cards.length && cards.map((card: CardPacksType, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell
                                component="th" scope="row" onClick={() => {
                            }}>
                                <NavLink to={`/cards/${card._id}`}>
                                    {card.name}
                                </NavLink>
                            </TableCell>
                            <TableCell align="center">{card.cardsCount}</TableCell>
                            <TableCell align="center" >{card.updated.slice(0, 10)}</TableCell>
                            <TableCell align="center">{card.user_name}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ '& button': { m: 1 }, minWidth: 250 }}>
                                    <Button size="small" variant="outlined" color="primary">Learn</Button>
                                    {userId === card.user_id ?
                                        <Button size="small" variant="contained" color="info" onClick={() => {
                                            onClickEditHandler(card._id)
                                        }}>Edit
                                        </Button>:null}
                                {userId === card.user_id ?
                                    <Button size="small" variant="contained" color="error" onClick={() => {
                                        onClickDeleteHandler(card._id)
                                    }}>Delete</Button>
                                   :null}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
