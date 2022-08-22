import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './EditProfile.module.css'
import style from '../../../common/style/ProjectBlock.module.css'
import {useAppSelector, useTypedDispatch} from '../../../redux/store'
import {updateUserDataTC} from "../../../redux/profileReducer";
import {Button} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {InputTypeFile} from "../../InputTypeFile/InputTypeFile";

const EditProfile = () => {
    let {name, avatar} = useAppSelector(state => state.profile)
    let isLogin = useAppSelector(state => state.login.isLogin)

    let [userAva, setUserAva] = useState(avatar)
    let [userName, setUserName] = useState<string>(name)
    let [edit, setEdit] = useState<boolean>(true)

    const dispatch = useTypedDispatch()


    const editUserData = () => {
        setEdit(true)
    }
    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value.trimStart())
    }
    const saveBtnHandler = () => {
        if (userName !== name || userAva !== avatar) {
            dispatch(updateUserDataTC(userName, userAva))
            setEdit(false)
        }
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
                    <InputTypeFile userAva={userAva}
                                   setUserAva={setUserAva}/>
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
                    <Button variant="outlined"
                            onClick={saveBtnHandler}
                            disabled={userName === name && userAva === avatar}>
                        Save
                    </Button>
                </div>

            </div>

        </div>
    );
};

export default EditProfile;