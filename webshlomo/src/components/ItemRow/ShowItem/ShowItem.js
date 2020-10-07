import React from 'react'

export default function ShowItem(props) {
    
    const handleClickDelete = async () => {
        console.log(`Click on item ${props.item._id['$oid']}`);
        await props.deleteFromDB(props.item._id['$oid'], props.typeOfData);
        props.readFromDB(props.typeOfData, props.date.selectedMonth, props.date.selectedYear);
    }

    return (
        <div className="row item" >
            <div className="leftBorder"></div>
            <div className="title">
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
