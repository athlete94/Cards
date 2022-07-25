import React from 'react';
import s from './Navbar.module.css'
import {PATH} from "../../App";
import {NavLink} from "react-router-dom";
import Profile from "../../asets/svg/Profile.svg";
import PackList from "../../asets/svg/Packslist.svg";

export const Navbar = () => {
    return (
        <div className={s.navbar}>
            <NavLink className={({ isActive }) => isActive  ? s.active : ''} to={PATH.PACKS}>
                 <div className={s.navlinkContainer }>
                     <img src={PackList} alt='Packs list icon'/>
                     <span className={s.text}>Packs list</span>
                 </div>
            </NavLink>
            <NavLink className={({ isActive }) => isActive  ? s.active : s.menu_item} to={PATH.PROFILE}>
                <div className={s.navlinkContainer}>
                    <img src={Profile} alt='profile icon'/>
                    <span className={s.text}>Profile</span>
                </div>
            </NavLink>
        </div>
    );
};

