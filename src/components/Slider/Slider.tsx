import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {setSliderParams} from "../../redux/searchReducer";

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
    // const [value1, setValue1] = React.useState<number[]>([0, 100]);
    const dispatch = useTypedDispatch()

    let value = useAppSelector(state => state.search.paramsSlider)

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

    // const handleChange1 = (
    //     event: Event,
    //     newValue: number | number[],
    //     activeThumb: number,
    // ) => {
    //     if (!Array.isArray(newValue)) {
    //         return;
    //     }
    //
    //     if (activeThumb === 0) {
    //         setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    //     } else {
    //         setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    //     }
    // };

    return (
        <Box sx={{ width: 200 }}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
            />
        </Box>
    );
}
