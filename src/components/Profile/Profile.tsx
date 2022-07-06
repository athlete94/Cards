import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './Profile.module.css'
import style from '../../common/style/ProjectBlock.module.css'
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Navigate} from "react-router-dom";
import MinimumDistanceSlider from "../Slider/Slider";
import {updateUserDataTC} from "../../redux/profileReducer";
import {PATH} from "../../App";
import {logoutTC} from "../../redux/authReducer";
import {Search} from "../Search/Search";

const Profile = () => {

    let [show, setShow] = useState<boolean>(false)// show button 'edit'
    let [edit, setEdit] = useState<boolean>(false)// change user data
    let [userName, setUserName] = useState<string>('')

    const dispatch = useTypedDispatch()

    let isLogin = useAppSelector(state => state.login.isLogin)
    let {name, avatar} = useAppSelector(state => state.profile)


    //-----------

    const editUserData = () => {
        setEdit(true)
    }
    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value.trimStart())
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onBlurHandler()
        }
    }
    const onBlurHandler = () => {
        userName && dispatch(updateUserDataTC(userName))
        setEdit(false)
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    //---------------search func


    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                <div className={s.profileItem}>
                    <div className={s.userInfo}
                         onMouseEnter={() => setShow(true)}
                         onMouseLeave={() => setShow(false)}
                    >
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
                                           onBlur={onBlurHandler}
                                           onKeyPress={onKeyPressHandler}/>
                                : <span className={s.userName}>
                                    {name}
                                </span>}
                        </div>

                        {show && <div className={s.edit} onClick={editUserData}>Edit</div>}
                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={style.packsList}>
                    <Search label={'Search of packs list'} width={'350%'}/>
                </div>

                <div className={s.logoutButton}>
                    <button onClick={logoutHandler}>LOGOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;