import React from 'react'
import './ShowItem.css';

export default function ShowItem(props) {
    
    const handleClickDelete = async () => {
        props.deleteFromDB(props.item._id['$oid'], props.typeOfData);
    }

    let checkInactiveClass = "";
    if (props.inactive) {
        checkInactiveClass = "title inactive"
    } else {
        checkInactiveClass = "title"
    }

    return (
        <div className="row item" >
            <div className="leftBorder"></div>
            <div className={checkInactiveClass}>
                <p>{props.item.name}</p>
            </div>
            <div className="value">
                <p className="numbersAlign">{props.item.value} €</p>
            </div>
            <div className="button trash">
                <button type="button" onClick={props.setEditMode}>&#xf044;</button>
                <button type="button" onClick={handleClickDelete}>&#xf2ed;</button>
            </div>
        </div>
    )
}
