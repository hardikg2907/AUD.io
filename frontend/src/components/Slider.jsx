import React from 'react'

const Slider = ({ sliderValue, setSliderValue }) => {
    return (
        <label>
            <input type="range" min="0" max="100" value={sliderValue} onChange={(e) => setSliderValue(e.target.valueAsNumber)} />
        </label>
    )
}

export default Slider