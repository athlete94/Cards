import React, {ChangeEvent} from 'react';
import style from "./RadioButton.module.css"

type RadioButtonType = {
    value: string
    onChangeListener:(value: string)=>void
}

export const RadioButton = (props: RadioButtonType) => {

    const setGender = (e:ChangeEvent<HTMLInputElement>) => {
        props.onChangeListener(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className={style.form_radio_group} onChange={setGender}>
            <div className={style.form_radio_group_item}>
                <input id="radio-1" type="radio" name="radio"  value='My' defaultChecked={props.value ==="My"}/>
                <label htmlFor="radio-1">My</label>
            </div>
            <div className={style.form_radio_group_item}>
                <input id="radio-2" type="radio" name="radio"  value='All' defaultChecked={props.value ==="All"}  />
                <label htmlFor="radio-2">All</label>
            </div>
        </div>
    );
};
