import React, {useState} from 'react';
import SuperButton from "./SuperButton/SuperButton";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";
import SuperInputText from "./SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {disabledButton, setDisplayText, TestInitialStateType} from "../redux/testReducer";

const Test = () => {
    let {disabledBtn, displayText} = useSelector<AppRootStateType, TestInitialStateType>(state => state.testReducer)
    const dispatch = useDispatch()

    let [text, setText] = useState<string>('')
    let [error, setError] = useState<string>('')

    const displayOnClickHandler = () => {
        if(text === '') {
            setError('Enter text')
        }
        text && dispatch(setDisplayText(text))
        setText('')
    }
    const clearOnClickHandler = () => {
        dispatch(setDisplayText(''))
    }
    const disabledBut = (checked: boolean) => {
        dispatch(disabledButton(checked))
    }

    const onChangeText = (text: string) => {
        setText(text)
        setError('')
    }

    return (
        <div>
            <h2>Test</h2>
            <div>
                <SuperInputText error={error}
                                value={text}
                                onChangeText={onChangeText}/>
            </div>
            <div>
                <SuperButton onClick={displayOnClickHandler} disabled={disabledBtn}>Display text</SuperButton>
                <SuperButton onClick={clearOnClickHandler} disabled={disabledBtn}>Clear text</SuperButton>
            </div>
            <div>
                <SuperCheckbox onChangeChecked={disabledBut}>disabled button</SuperCheckbox>
            </div>
            <br/>
            <div>{displayText}</div>

        </div>
    );
};

export default Test;