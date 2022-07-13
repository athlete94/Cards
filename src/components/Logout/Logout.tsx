import React from 'react';
import s from "./Logout.module.css";
import {logoutTC} from "../../redux/authReducer";
import {useTypedDispatch} from "../../redux/store";

export const Logout = () => {

    let dispatch = useTypedDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={s.logoutButton}>
            <button onClick={logoutHandler}>LOGOUT</button>
        </div>
    );
};