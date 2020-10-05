import React from 'react'
import './ItemRow.css';

export default function ItemRow(props) {
    
    const handleClick = async () => {
        console.log(`Click on item ${props.item._id['$oid']}`);
        await props.deleteFromDB(props.item._id['$oid'], props.typeOfData);
        props.readFromDB(props.typeOfData, props.date.currentMonth, props.date.currentYear);
    }    
    
    return (
        <div className="row" >
            <div className="leftBorder"></div>
            <div className="title">
                <p>{props.item.name}</p>
            </div>
            <div className="value">
                <p className="numbersAlign">{props.item.value} €</p>
            </div>
            <div className="button trash">
                <button type="button" onClick={handleClick}>&#xf2ed;</button>
            </div>
        </div>
    )
}
