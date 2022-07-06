import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deletePickToState, editPackToState} from "../../../redux/packs-reducer";
import {useAppSelector, useTypedDispatch} from "../../../redux/store";
import {Button} from "@mui/material";
import Box from '@mui/material/Box';

type PacksTableType = {
    sort: string
}


export default function PacksTable(props: PacksTableType) {

    const dispatch = useTypedDispatch()
    const cards = useAppSelector(state => state.picks.cardPacks)
    debugger
    const userId = sessionStorage.getItem('userId')
    if(userId!=null)

debugger

    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePickToState(id))
    }
    const onClickEditHandler = (id: string) => {
        dispatch(editPackToState(id))
    }

    let up = document.getElementById("update")
    if(up!=null) up.addEventListener('click', ()=>{

    })

    return (
        <TableContainer component={Paper}>
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
                    {cards != [] && cards.map((card) => (
                        <TableRow
                            key={card.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{card.name}</TableCell>
                            <TableCell align="center">{card.cardsCount}</TableCell>
                            <TableCell align="center" >{card.updated.slice(0, 10)}</TableCell>
                            <TableCell align="center">{card.user_name}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ '& button': { m: 1 } }}>
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
