import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppSelector, useTypedDispatch} from "../../redux/store";
import {setSliderParams, setTouchSlider} from "../../redux/searchReducer";


const minDistance = 10;

export default function MinimumDistanceSlider() {
    const dispatch = useTypedDispatch()

    let value = useAppSelector(state => state.search.paramsSlider)
    let touchSlider = useAppSelector(state => state.search.touchSlider)

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

    const committedHandler = () => { // запускается при отпускании слайдера
        dispatch(setTouchSlider(!touchSlider))
    }

    return (
        <Box sx={{width: 200}}>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <span>{value[0]}</span>
                <span>{value[1]}</span>
            </div>

            <Slider
                valueLabelDisplay='off'
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange1}
                disableSwap
                color="secondary"
                onChangeCommitted={committedHandler}
            />

        </Box>
    );
}
