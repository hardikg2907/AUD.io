import React from 'react'

const DropDown = ({ dropValue, setDropValue, options }) => {
    return (
        <select value={dropValue} onChange={(e) => setDropValue(e.target.value)}>
            {options?.map((item) => (
                <option value={item} key={item}>{item}</option>
            ))}
        </select>
    )
}

export default DropDown