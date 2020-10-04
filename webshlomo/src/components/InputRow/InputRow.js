import React, { useState } from 'react'
import './InputRow.css'

export default function InputRow(props) {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    
    const handleChange = (event) => {
        console.log(event.target)
        if (event.target.name === 'inputTitle') {
            setName(event.target.value)
        }
        if (event.target.name === 'inputValue') {
            setValue(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        console.log('Submitted');
        await props.writeToDB({name: name, value: parseInt(value)}, props.type);
        setName('');
        setValue('');
        props.readFromDB();
    }
    
    return (
        <form onSubmit={handleSubmit}>
                <div className="row noHover">
                    <div className="leftBorder"></div>
                    <div className="inputTitle">
                        <input type="text"
                            name="inputTitle"
                            value={name}
                            placeholder="Input Title"
                            onChange={handleChange} />
                    </div>
                    <div className="inputValue">
                        <input type="number"
                            name="inputValue"
                            value={value}
                            placeholder="Input Value"
                            onChange={handleChange} />
                    </div>
                    <div className="inputButtons">
                        <button type="submit">&#xf00c;</button>
                        <button type="button" onClick={props.changeVisibility}>&#xf05e;</button>
                    </div>
                </div>
        </form>
    )
}