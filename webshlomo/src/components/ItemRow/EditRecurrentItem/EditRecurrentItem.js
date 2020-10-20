import React, { useState, useRef } from 'react'
import './EditRecurrentItem.css';

export default function EditRecurrentItem(props) {
    
    
    const [userInput, setUserInput] = useState({
                                        name: props.item.name, 
                                        value: props.item.value,
                                        month: props.item.month,
                                        year: props.item.year
                                    })

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

    const START=2020, END=2036;
    const yearsArray = Array.from({length: END-START}, (x, i) => i+START)

    const selectedYears = useRef({
        endYear: Math.max(...userInput.year),
        startYear: Math.min(...userInput.year)
    })                     

    const changeMonthArray = (array, newValue) => {
        if (array.includes(newValue)){
            array = array.filter(item => item !== newValue)
        } else {
            array.push(newValue)
        }
        return array
    }

    const handleChange = ({ target }) => {
        const { name, value, type } = target;
        
        switch (type) {
            case "select-one":
                selectedYears.current[name] = value;
                break;
            case "checkbox":
                const newMonthArray = changeMonthArray(userInput.month, parseInt(name))
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
        let data = userInput;
        data.id = props.item._id['$oid']
        data.yearArray = Array.from({length: selectedYears.current.endYear-selectedYears.current.startYear+1}, (x, i) => i+selectedYears.current.startYear)
        props.updateInDB(data, 
            props.typeOfData);
        props.setEditMode()
    }

    const handleClickEditMode = (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        props.setEditMode()
    }

    const createCheckBox = (month) => {
        return (
            <label key={month.label}>
                <input
                    type="checkbox"
                    name={month.label}
                    checked={userInput.month.includes(month.label)}
                    onChange={handleChange}
                />
                {month.name}
            </label>
        )
    }
 
        return (
            <form onSubmit={handleSubmit}>
                <div className="row noHover noBorderBottom">
                    <div className="leftBorder"></div>
                    <div className="inputTitle">
                        <input type="text"
                            name="name"
                            value={userInput.name}
                            placeholder="Input Title"
                            onChange={handleChange} />
                    </div>
                    <div className="inputValue">
                        <input type="number"
                            name="value"
                            value={userInput.value}
                            placeholder="Input Value"
                            onChange={handleChange} />
                    </div>
                    <div className="inputButtons">
                        <button type="button" onClick={handleClickEditMode}>&#xf05e;</button>
                        <button type="submit">&#xf00c;</button>
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
                            <select id="startYear" name="startYear" defaultValue={selectedYears.current.startYear} onChange={handleChange}>
                                {yearsArray.map(year => <option value={year} key={year}>{year}</option>)}
                            </select>
                            <label htmlFor="endYear">End year:</label>
                            <select id="endYear" name="endYear" defaultValue={selectedYears.current.endYear} onChange={handleChange}>
                                {yearsArray.map(year => <option value={year} key={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
            </form>
        )
  

}