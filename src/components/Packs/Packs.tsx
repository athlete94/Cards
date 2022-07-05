import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import SearchInput from '../../utils/SearchInput/SearchInput';
import s from "../Profile/Profile.module.css";
import MinimumDistanceSlider from "../Slider/Slider";
import PacksTable from "./PacksTable/PacksTable";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {addPickToState, setCardsAllThunkCreator} from "../../redux/packs-reducer";
import {Search} from "../Search/Search";
import {useEffect} from "react";


export default function Packs() {

    const dispatch = useTypedDispatch()
    const handler = useAppSelector(state => state.search.handler)

    const onClickButton =()=>{
        dispatch(addPickToState())
    }

    useEffect(()=>{
        debugger
        dispatch(setCardsAllThunkCreator())
    },[handler])

    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                <div className={s.profileItem}>
                    <div className={s.userInfo}>



                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={s.packsList}>
                    <div>
                    <Search label={'search to packs list'} />
                    <button onClick={onClickButton}>Add new pack</button>
                </div>
                    <div>
                    <PacksTable/>
                    </div>
                </div>

                <div className={s.logoutButton}>
                    <button >LOGOUT</button>
                </div>
            </div>
        </div>
    );
}
