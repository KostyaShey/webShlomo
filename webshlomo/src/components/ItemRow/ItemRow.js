import React, { useState } from 'react'

export default function ItemRow(props) {
    
    const handleClick = async () => {
        console.log(`Click on item ${props.item._id['$oid']}`);
        await props.deleteFromDB(props.item._id['$oid']);
        props.readFromDB();
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
            <div className="button">
                <button type="button" onClick={handleClick}>&#xf05e;</button>
            </div>
        </div>
    )
}
