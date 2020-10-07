import React, { useState } from 'react'

export default function InputRow(props) {
    
    
    const [userInput, setUserInput] = useState({inputTitle: props.item.name, inputValue: props.item.value})
    
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
          }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        //To Do: ask some1 smart how to properly chain two requests
        const test1 = await props.updateInDB({name: userInput.inputTitle, value: parseInt(userInput.inputValue)}, props.item._id['$oid'], props.typeOfData);
        const test2 = await props.readFromDB(props.typeOfData, props.date.selectedMonth, props.date.selectedYear);
        console.log(test2)
        props.setEditMode()
    }

    const handleClickEditMode = (event) => {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        props.setEditMode()
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
                <div className="inputButtons">
                    <button type="button" onClick={handleClickEditMode}>&#xf05e;</button>
                    <button type="submit">&#xf00c;</button>
                </div>
            </div>
        </form>
    )
}