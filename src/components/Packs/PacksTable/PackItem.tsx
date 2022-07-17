import React, {useState} from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {NavLink, useNavigate} from "react-router-dom";
import {ModalDeletePack} from "../../Modals/ModalPack/ModalDeletePack";
import {ModalEditPack} from "../../Modals/ModalPack/ModalEditPack";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {CardPacksType, deletePickToState, editPackToState} from "../../../redux/packs-reducer";
import {useAppSelector, useTypedDispatch} from "../../../redux/store";
import moment from "moment";
import { setLearnPackNameAC } from '../../../redux/learnReducer';
import {PATH} from "../../../App";


type PackItemType = {
    pack:CardPacksType

}

const PackItem:React.FC<PackItemType> = ({pack}) => {

    const userId = useAppSelector(state => state.profile._id)
    let allOrMyPacks = useAppSelector(state=>state.login.allOrMyPacks)

    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);
    const [activeEditModal, setActiveEditModal] = useState<boolean>(false);

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()


    const learnHandler = (id: string, name: string) => {
        dispatch(setLearnPackNameAC(name));
        navigate(PATH.LEARN + `/${id}`);
    };

    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePickToState(id,allOrMyPacks))
        setActiveDeleteModal(false)
    }
    const onClickEditHandler = (id: string,newName:string) => {
        debugger
        dispatch(editPackToState(id,newName,allOrMyPacks))
        setActiveEditModal(false)
    }

    const updateTime = (time:string) =>{
        return  moment(time).format('D/MM/YY h:mm');
    }

    return (
        <TableRow
            key={pack._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell
                component="th" scope="row" onClick={() => {
            }}>
                <NavLink to={`/cards/${pack._id}`}>
                    {pack.name}
                </NavLink>
            </TableCell>
            <TableCell align="center" >{pack.cardsCount}</TableCell>
            <TableCell align="center">{updateTime(pack.updated)}</TableCell>
            <TableCell align="center">{pack.user_name}</TableCell>
            <TableCell align="center">
                <ModalDeletePack active={activeDeleteModal} setActive={setActiveDeleteModal} packName={pack.name} deletePack={()=>onClickDeleteHandler(pack._id)}/>
                <ModalEditPack active={activeEditModal} setActive={setActiveEditModal} editPack={(value:string)=>onClickEditHandler(pack._id,value)} packName={pack.name}/>
                <Box sx={{ '& button': { m: 1 } }}>

                    <Button size="small" variant="outlined" color="primary"
                            onClick={() => learnHandler(pack._id, pack.name)}>Learn</Button>

                    {userId === pack.user_id ?
                        <Button size="small" variant="contained" color="info" onClick={() => {
                            setActiveEditModal(true)
                        }}>Edit
                        </Button>:null}
                    {userId === pack.user_id ?
                        <Button size="small" variant="contained" color="error" onClick={() => {
                            setActiveDeleteModal(true)
                        }}>Delete</Button>
                        :null}
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default PackItem;