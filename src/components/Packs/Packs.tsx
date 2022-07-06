import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "../Profile/Profile.module.css";
import MinimumDistanceSlider from "../Slider/Slider";
import PacksTable from "./PacksTable/PacksTable";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {addPickToState, setCardsAllThunkCreator} from "../../redux/packs-reducer";
import {Search} from "../Search/Search";
import {useEffect} from "react";
import useDebounce from "../../common/hooks/useDebounce";
import {Button} from "@mui/material";


export default function Packs() {

    const dispatch = useTypedDispatch()
    const handler = useAppSelector(state => state.search.handler)
    let sliderParams = useAppSelector(state => state.search.paramsSlider)
    let search = useAppSelector(state => state.search.searchText)


    const debouncedSearchTerm = useDebounce(search, 500);

    const onClickButton = () => {
        dispatch(addPickToState())
    }

    useEffect(() => {
        debugger
        dispatch(setCardsAllThunkCreator(search, sliderParams))
    }, [handler, debouncedSearchTerm])

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
                    <div className={s.search_block}>
                        <Search label={'search to packs list'}/>
                        <Button variant="text" onClick={onClickButton}>Add new pack</Button>
                    </div>
                    <div>
                        <PacksTable/>
                    </div>
                </div>

                <div className={s.logoutButton}>
                    <button>LOGOUT</button>
                </div>
            </div>
        </div>
    );
}
