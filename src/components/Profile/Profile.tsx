import React, {useEffect, useState} from 'react';
import s from './Profile.module.css'
import style from '../../common/style/ProjectBlock.module.css'
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {Navigate, NavLink} from "react-router-dom";
import MinimumDistanceSlider from "../Slider/Slider";
import {PATH} from "../../App";
import PacksTable from "../Packs/PacksTable/PacksTable";
import {Logout} from "../Logout/Logout";
import {setSort} from "../../redux/searchReducer";
import {setCardsAllThunkCreator} from "../../redux/packs-reducer";

const Profile = () => {

    let [show, setShow] = useState<boolean>(false)// show button 'edit'

    const dispatch = useTypedDispatch()

    let isLogin = useAppSelector(state => state.login.isLogin)
    let {sortPacks, paramsSlider, searchText: search} = useAppSelector(state => state.search)

    let {name, avatar} = useAppSelector(state => state.profile)

    const onClickSortHandler = () => {
        if (sortPacks === '0updated') {
            dispatch(setSort('1updated'))
        } else {
            dispatch(setSort('0updated'))
        }
    }

    useEffect(() => {
        dispatch(setCardsAllThunkCreator(search, paramsSlider ,"My", sortPacks, 0, 0))
    }, [])


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
                            <span className={s.userName}>
                                    {name}
                                </span>
                        </div>

                        {show && <div className={s.edit}>
                            <NavLink to={PATH.EDIT_PROFILE}>
                                Edit
                            </NavLink>
                        </div>}
                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={s.packsList}>
                    <div className={s.search_block}>
                        {/*<Search label={'search to packs list'} width={'280%'}/>*/}
                    </div>
                    <PacksTable sort={sortPacks} onClickSortHandler={onClickSortHandler} />
                </div>
                <Logout/>
            </div>
        </div>
    );
};

export default Profile;