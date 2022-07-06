import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {setHandler, setSliderParams} from "../../redux/searchReducer";
import {useState} from "react";

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
    // const [value1, setValue1] = React.useState<number[]>([0, 100]);
    const dispatch = useTypedDispatch()

    let value = useAppSelector(state => state.search.paramsSlider)
    let [count, setCount] = useState<number>(0)

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            dispatch(setSliderParams([Math.min(newValue[0], value[1] - minDistance), value[1]]));
        } else {
            dispatch(setSliderParams([value[0], Math.max(newValue[1], value[0] + minDistance)]));
        }
    };

    const onMouseUpHandler = () => {
        setCount(++count)
        dispatch(setHandler(count))
    }

    return (
        <Box sx={{ width: 200 }}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                onMouseUp={onMouseUpHandler}
                color="secondary"
            />
        </Box>
    );
}
