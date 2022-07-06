import React from 'react';
import s from './Navbar.module.css'
import {PATH} from "../../App";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={s.navbar}>
            <NavLink className={({ isActive }) => isActive  ? s.active : ''} to={PATH.PACKS}>Packs list</NavLink>
            <NavLink className={({ isActive }) => isActive  ? s.active : s.menu_item} to={PATH.PROFILE}>Profile</NavLink>
        </div>
    );
};

