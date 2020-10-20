import React, { useState } from 'react'
import './EditItem.css';

export default function EditItem(props) {
    
    const [userInput, setUserInput] = useState({
                                        name: props.item.name, 
                                        value: props.item.value,
                                    })


    const handleChange = ({ target }) => {
        const { name, value } = target;
        
                setUserInput((prev) => ({
                    ...prev,
                    [name]: value
                  }));
        }   

    const handleSubmit = async (event) => {
        event.preventDefault(); // preventDefault disables the default requests on submit.
        let data = userInput;
        data.id = props.item._id['$oid'];
        data.month = props.date.selectedMonth +1;
        data.year = props.date.selectedYear;
        props.updateInDB(data, 
            props.typeOfData);
        props.setEditMode()
    }

    const handleClickEditMode = (event) => {
        event.preventDefault(); // preventDefault disables the default requests on submit.
        props.setEditMode()
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
            </form>
        )
        }
