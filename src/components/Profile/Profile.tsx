import React, {ChangeEvent, useState, KeyboardEvent, MouseEventHandler} from 'react';
import s from './Profile.module.css'
import style from '../../common/style/ProjectBlock.module.css'
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Navigate} from "react-router-dom";
import MinimumDistanceSlider from "../Slider/Slider";
import {updateUserDataTC} from "../../redux/profileReducer";
import {PATH} from "../../App";


const Profile = () => {

    let [show, setShow] = useState<boolean>(false)// show button 'edit'
    let [edit, setEdit] = useState<boolean>(false)// change user data
    let [userName, setUserName] = useState<string>('')

    debugger
    const dispatch = useTypedDispatch()

    let isLogin = useAppSelector(state => state.login.isLogin)
    let {name, avatar} = useAppSelector(state => state.profile)


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

    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                <div className={s.profileItem}
                     onMouseEnter={() => setShow(true)}
                     onMouseLeave={() => setShow(false)}
                >

                    <div className={s.userInfo}>
                        <div className={s.avatar}>
                            <img
                                src="https://www.google.com/imgres?imgurl=https%3A%2F%2Ffilestore.community.support.microsoft.com%2Fapi%2Fimages%2Ff2e55cbf-8316-4d3a-9412-ecd8194b2a72%3Fupload%3Dtrue&imgrefurl=https%3A%2F%2Fanswers.microsoft.com%2Fru-ru%2Fwindows%2Fforum%2Fall%2F%25D0%25B0%25D0%25B2%25D0%25B0%25D1%2582%25D0%25B0%25D1%2580%25D0%25BA%25D0%25B0%2Fbbdaae21-938f-4475-96da-1741a549172a&tbnid=n9Cs7myTYZc_OM&vet=12ahUKEwjA7d66wc74AhWHBXcKHVQdBrcQMygJegUIARDrAQ..i&docid=wJYqj9-W4zzXsM&w=295&h=262&q=%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B0&ved=2ahUKEwjA7d66wc74AhWHBXcKHVQdBrcQMygJegUIARDrAQ"
                                alt=""/>
                        </div>
                        <div className={s.userName}>
                            {edit ? <input type="text"
                                           autoFocus
                                           placeholder={name}
                                           onChange={changeUserName}
                                           onBlur={onBlurHandler}
                                           onKeyPress={onKeyPressHandler}/>
                                : <h3>{name}</h3>}
                        </div>
                        {show && <div className={s.edit} onClick={editUserData}>Edit</div>}


                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={s.packsList}>

                </div>
            </div>
        </div>
    );
};

export default Profile;