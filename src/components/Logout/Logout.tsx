import React from 'react';
import s from "./Logout.module.css";
import {logoutTC} from "../../redux/authReducer";
import {useTypedDispatch} from "../../redux/store";
import LogoutIcon from "../../asets/svg/Logout.svg"


export const Logout = () => {

    let dispatch = useTypedDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <button onClick={logoutHandler} className={s.logout}>
            <img src={LogoutIcon} alt="Logout"/>
        </button>
    );
};