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


export default function Packs() {

    const dispatch = useTypedDispatch()
    const handler = useAppSelector(state => state.search.handler)
    let sliderParams = useAppSelector(state => state.search.paramsSlider)
    let search = useAppSelector(state => state.search.searchText)
    let isLogin = useAppSelector(state => state.login)


    const debouncedSearchTerm = useDebounce(search, 500);

    const onClickButton = () => {
        dispatch(addPickToState())
    }

    const [value, setValue] = useState<string>("All")
    const [sort, setSort] = useState<string>('0updated')


    useEffect(() => {
        dispatch(setCardsAllThunkCreator(search, sliderParams, value, sort))
    }, [handler, debouncedSearchTerm, value, sort])


    const onChangeListener = (value: string) => {
        setValue(value)
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
                        <PacksTable sort={sort}/>
                        <button onClick={onClickSortHandler}>Sort</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
