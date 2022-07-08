import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './EditProfile.module.css'
import style from '../../../common/style/ProjectBlock.module.css'
import {useAppSelector, useTypedDispatch} from '../../../redux/store'
import {updateUserData, updateUserDataTC} from "../../../redux/profileReducer";
import {logoutTC} from "../../../redux/authReducer";
import {Button, Icon} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditProfile = () => {
    let {name, avatar} = useAppSelector(state => state.profile)
    let isLogin = useAppSelector(state => state.login.isLogin)

    let [userName, setUserName] = useState<string>('')
    let [edit, setEdit] = useState<boolean>(true)

    const dispatch = useTypedDispatch()


    const editUserData = () => {
        setEdit(true)
    }
    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value.trimStart())
    }
    const saveBtnHandler = () => {
        userName && dispatch(updateUserDataTC(userName))
        setEdit(false)
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }


    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={style.projectBlock}>

            <div className={s.profile}>
                <div className={s.backBtn}>
                    <NavLink to={PATH.PROFILE}>
                        <ArrowBackIcon/>
                    </NavLink>
                </div>

                <div className={s.avatar}>
                    <img
                        src={'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg'}
                        alt=""/>
                </div>
                <div className={s.userName}>
                    {edit ? <input type="text"
                                   autoFocus
                                   placeholder={name}
                                   onChange={changeUserName}
                                   />
                        : <span className={s.userName} onDoubleClick={editUserData}>
                                    {name}
                                </span>
                    }
                </div>
                <div>
                    <Button variant="outlined" onClick={saveBtnHandler}>Save</Button>
                </div>

            </div>

        </div>
    );
};

export default EditProfile;