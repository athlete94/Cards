import * as React from 'react';
import style from "../../common/style/ProjectBlock.module.css";
import s from "./Packs.module.css";
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
import {setSearch, setSort} from "../../redux/searchReducer";
import PaginationRounded from "../Pagination/Pagination";
import BasicSelect from "../PageCount/PageCount";

export default function Packs() {

    const dispatch = useTypedDispatch()
    let {searchText: search, touchSlider, paramsSlider, sortPacks} = useAppSelector(state => state.search)
    let isLogin = useAppSelector(state => state.login)
    let {page, pageCount, cardPacksTotalCount} = useAppSelector(state => state.picks)


    const debouncedSearchTerm = useDebounce(search, 500);

    const onClickButton = () => {
        dispatch(addPickToState())
    }

    const [value, setValue] = useState<string>("All")

    debugger
    useEffect(() => {
        dispatch(setCardsAllThunkCreator(search, paramsSlider, value, sortPacks, page, pageCount))
    }, [touchSlider, debouncedSearchTerm, value, sortPacks, page, pageCount])


    const onChangeListener = (value: string) => {
        setValue(value)
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
                            <RadioButton value={value} onChangeListener={onChangeListener}/>
                        </div>

                    </div>
                    <div className={s.filter}>
                        <h3>Number of cards</h3>
                        <MinimumDistanceSlider/>
                    </div>
                </div>
                <div className={s.packsList}>
                    <div>
                        {value === "All" ? <div className={style.title}>All Packs</div> :
                            <div className={style.title}>My packs</div>}
                        <div className={style.form}>
                            <Search label={'Search'}
                                    width={'280%'}
                                    callback={searchHandler}
                                    value={search}/>
                            <Button variant="contained" color="secondary" onClick={onClickButton}>Add new pack</Button>
                        </div>
                    </div>
                    <div>
                        <PacksTable sort={sortPacks}/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button onClick={onClickSortHandler}>Sort</button>
                            <BasicSelect setCount={(count) => dispatch(setPageCount(count))} pageCount={pageCount}/>
                            <PaginationRounded callback={(page) => dispatch(setPage(page))} count={Math.ceil(cardPacksTotalCount / pageCount)} page={page}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
