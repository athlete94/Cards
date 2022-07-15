import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./Packs.module.css";
import MinimumDistanceSlider from "../Slider/Slider";
import PacksTable from "./PacksTable/PacksTable";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {addPickToState, setCardsAllThunkCreator} from "../../redux/packs-reducer";
import {Search} from "../Search/Search";
import {useEffect, useState} from "react";
import useDebounce from "../../common/hooks/useDebounce";
import {Navigate} from "react-router-dom";
import {PATH} from "../../App";
import {RadioButton} from "../../utils/RadioButton/RadioButton";
import {Button} from "@mui/material";
import {setSearch} from "../../redux/searchReducer";
import {setAllOrMyPacks} from "../../redux/authReducer";
import {ModalAddPack} from "../Modals/ModalPack/ModalAddPack";


export default function Packs() {

    const dispatch = useTypedDispatch()
    const handler = useAppSelector(state => state.search.handler)
    let sliderParams = useAppSelector(state => state.search.paramsSlider)
    let search = useAppSelector(state => state.search.searchText)
    let isLogin = useAppSelector(state => state.login.isLogin)
    let allOrMyPacks = useAppSelector(state=>state.login.allOrMyPacks)

    const debouncedSearchTerm = useDebounce(search, 500);

    const onClickAddPackHandler = (newPack:string) => {
        dispatch(addPickToState(newPack, allOrMyPacks))
        setActiveAddModule(false)
    }

    const [activeAddModule, setActiveAddModule] = useState(false)
    const [sort, setSort] = useState<string>('0updated')


    useEffect(() => {
        dispatch(setCardsAllThunkCreator(search, sliderParams, allOrMyPacks, sort))
    }, [handler, debouncedSearchTerm, allOrMyPacks, sort])


    const onChangeListener = (value: string) => {
        dispatch(setAllOrMyPacks(value))

    }

    const onClickSortHandler = () => {
        if (sort === '0updated') {
            setSort('1updated')
        } else {
            setSort('0updated')
        }
    }

    // search

    const searchHandler = (value: string) => {
        dispatch(setSearch(value))

    }

    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={style.projectBlock}>
            <div className={s.profile}>
                <div className={s.profileItem}>
                    <div className={s.userInfo}>
                        <div className="form_radio_group">
                            <RadioButton value={allOrMyPacks} onChangeListener={onChangeListener}/>
                        </div>

                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={s.packsList}>
                    <div>
                        {allOrMyPacks === "All" ? <div className={style.title}>All Packs</div> :
                            <div className={style.title}>My packs</div>}
                        <div className={style.form}>
                            <Search label={'Search'}
                                    width={'280%'}
                                    callback={searchHandler}
                                    value={search}/>
                            <Button variant="contained" color="secondary" onClick={()=>setActiveAddModule(true)}>Add new pack</Button>
                            <ModalAddPack active={activeAddModule} setActive={setActiveAddModule} addPack={(value)=>{onClickAddPackHandler(value)}}/>
                        </div>
                    </div>
                    <div>
                        <PacksTable sort={sort} onClickSortHandler={onClickSortHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
