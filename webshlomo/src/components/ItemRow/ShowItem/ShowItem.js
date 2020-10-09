import React, {useRef} from 'react'
import './ShowItem.css';

export default function ShowItem(props) {
    
    const handleClickDelete = async () => {
        props.deleteFromDB(props.item._id['$oid'], props.typeOfData);
    }

    const checkInactiveClass = useRef('')

    if (!props.isActive) {
        checkInactiveClass.current = "title inactive paddingleft"
    } else {
        checkInactiveClass.current = "title paddingleft"
    }

    return (
        <div className="row item" >
            <div className="leftBorder"></div>
            <div className={checkInactiveClass.current}>
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
