import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import SearchInput from '../../utils/SearchInput/SearchInput';
import s from "../Profile/Profile.module.css";
import MinimumDistanceSlider from "../Slider/Slider";
import PacksTable from "./PacksTable/PacksTable";
import {useTypedDispatch} from "../../redux/store";
import {addPickToState} from "../../redux/packs-reducer";


export default function Packs() {

    const dispatch = useTypedDispatch()

    const onClickButton =()=>{
        dispatch(addPickToState())
    }

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
                    <SearchInput buttonName={'Add new pack'} onClickAddItem={onClickButton}/>
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
