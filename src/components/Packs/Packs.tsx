import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./Packs.module.css";
import st from '../../common/style/PaginationBlock.module.css'
import MinimumDistanceSlider from "../Slider/Slider";
import PacksTable from "./PacksTable/PacksTable";
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {addPickToState, setCardsAllThunkCreator, setPage, setPageCount} from "../../redux/packs-reducer";
import {Search} from "../Search/Search";
import {useEffect, useState} from "react";
import useDebounce from "../../common/hooks/useDebounce";
import {Navigate} from "react-router-dom";
import {PATH} from "../../App";
import {RadioButton} from "../../utils/RadioButton/RadioButton";
import {Button} from "@mui/material";
import {ModalAddPack} from "../Modals/ModalPack/ModalAddPack";

import {setSearch, setSort} from "../../redux/searchReducer";
import PaginationRounded from "../Pagination/Pagination";
import BasicSelect from "../PageCount/PageCount";
import {setAllOrMyPacks} from "../../redux/authReducer";

export default function Packs() {

    const dispatch = useTypedDispatch()
    let allOrMyPacks = useAppSelector(state=>state.login.allOrMyPacks)
    let {page, pageCount, cardPacksTotalCount} = useAppSelector(state => state.picks)
    let {searchText: search, touchSlider, paramsSlider, sortPacks} = useAppSelector(state => state.search)
    let isLogin = useAppSelector(state => state.login)


    const debouncedSearchTerm = useDebounce(search, 500);

    const onClickAddPackHandler = (newPack:string) => {
        dispatch(addPickToState(newPack, allOrMyPacks))
        setActiveAddModule(false)
    }

    const [activeAddModule, setActiveAddModule] = useState(false)



    useEffect(() => {
        dispatch(setCardsAllThunkCreator(search, paramsSlider, allOrMyPacks, sortPacks, page, pageCount))
    }, [touchSlider, debouncedSearchTerm, allOrMyPacks, sortPacks,  page, pageCount])


    const onChangeListener = (value: string) => {
        dispatch(setSearch(''))
        dispatch(setAllOrMyPacks(value))
    }

    const onClickSortHandler = () => {
        if (sortPacks === '0updated') {
            dispatch(setSort('1updated'))
        } else {
            dispatch(setSort('0updated'))
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
                        <PacksTable sort={sortPacks} onClickSortHandler={onClickSortHandler} />
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <div className={st.paginationBlock}>
                                <BasicSelect setCount={(count) => dispatch(setPageCount(count))} pageCount={pageCount}/>
                                <PaginationRounded callback={(page) => dispatch(setPage(page))} count={Math.ceil(cardPacksTotalCount / pageCount)} page={page}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
