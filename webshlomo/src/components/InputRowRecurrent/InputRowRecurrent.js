import React, { useState, useRef } from 'react'
import './InputRowRecurrent.css'

export default function InputRowRecurrent(props) {
    
    const monthArray = [
        {name: 'January', label: 1},
        {name: 'February', label: 2},
        {name: 'March', label: 3},
        {name: 'April', label: 4},
        {name: 'May', label: 5},
        {name: 'June', label: 6},
        {name: 'July', label: 7},
        {name: 'August', label: 8},
        {name: 'September', label: 9},
        {name: 'Oktober', label: 10},
        {name: 'November', label: 11},
        {name: 'December', label: 12}
    ];

    const selectedMonth = useRef([])

    const START=2020, END=2036;
    const yearsArray = Array.from({length: END-START}, (x, i) => i+START)
    
    const [userInput, setUserInput] = useState({startYear: 2020, endYear: 2020})

    const changeMonthArray = (array, newValue) => {
        if (array.includes(newValue)){
            array = array.filter(item => item !== newValue)
        } else {
            array.push(newValue)
        }
        return array
    }

    const createCheckBox = (month) => {
        return (
            <label key={month.label}>
                <input
                    type="checkbox"
                    name={month.label}
                    onChange={handleChange}
                    checked={selectedMonth.current.includes(month.label)}
                />
                {month.name}
            </label>
        )
    }
    
    const handleChange = ({ target }) => {
        const { name, value, type } = target;
        
        switch (type) {
            case "select-one":
                console.log(name)
                console.log(value)
                setUserInput((prev) => ({
                    ...prev,
                    [name]: value
                  }));              
                break;
            case "checkbox":
                const newMonthArray = changeMonthArray(selectedMonth.current, parseInt(name))
                setUserInput((prev) => ({
                    ...prev,
                    month: newMonthArray
                }));
                break;
            default:
                setUserInput((prev) => ({
                    ...prev,
                    [name]: value
                  }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        const userYearArray = Array.from({length: userInput.endYear-userInput.startYear+1}, (x, i) => i+userInput.startYear);
        const newData = {
            name: userInput.inputTitle,
            value: parseInt(userInput.inputValue),
            month: selectedMonth.current,
            year: userYearArray
        }
        props.writeToDB(newData, props.typeOfData);
        setUserInput({inputTitle:'', inputValue:''});
        selectedMonth.current = [];
        props.setShowInputRow(!props.showInputRow);
    }
    
    return (
        <form onSubmit={handleSubmit}>
                <div className="row noHover noBorderBottom">
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
                        <button type="button" onClick={() => props.setShowInputRow(!props.showInputRow)}>&#xf05e;</button>
                    </div>
                </div>
                <div className="row noHower noBorderBottom">
                    <div className="leftBorder"></div>
                    <div className="labels">
                        {monthArray.map(item => createCheckBox(item))}
                    </div>
                </div>
                <div className="row noHower">
                    <div className="leftBorder"></div>
                        <div className="selects">
                            <label htmlFor="startYear">Starting year:</label>
                            <select id="startYear" name="startYear" onChange={handleChange}>
                                {yearsArray.map(year => <option value={year} key={year}>{year}</option>)}
                            </select>
                            <label htmlFor="endYear">End year:</label>
                            <select id="endYear" name="endYear" onChange={handleChange}>
                                {yearsArray.map(year => <option value={year} key={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
        </form>
    )
}