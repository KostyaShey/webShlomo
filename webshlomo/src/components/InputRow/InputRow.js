import React, { useState } from 'react'
import './InputRow.css'

export default function InputRow(props) {
    
    
    const [userInput, setUserInput] = useState({})
    
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
          }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        await props.writeToDB({name: userInput.inputTitle, value: parseInt(userInput.inputValue)}, props.type, props.date.currentMonth, props.date.currentYear);
        setUserInput({inputTitle:'', inputValue:''})
        props.readFromDB(props.type, props.date.currentMonth, props.date.currentYear);
    }
    
    return (
        <form onSubmit={handleSubmit}>
                <div className="row noHover">
                    <div className="leftBorder"></div>
                    <div className="inputTitle">
                        <input type="text"
                            name="inputTitle"
                            value={userInput.inputTitle}
                            placeholder="Input Title"
                            onChange={handleChange} />
                    </div>
                    <div className="inputValue">
                        <input type="number"
                            name="inputValue"
                            value={userInput.inputValue}
                            placeholder="Input Value"
                            onChange={handleChange} />
                    </div>
                    <div className="inputButtons inputButtons">
                        <button type="submit">&#xf00c;</button>
                        <button type="button" onClick={props.changeVisibility}>&#xf05e;</button>
                    </div>
                </div>
        </form>
    )
}