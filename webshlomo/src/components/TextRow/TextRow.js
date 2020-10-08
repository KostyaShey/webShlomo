import React from 'react'

export default function TextRow(props) {
  
    let checkInactiveClass = "";
    if (props.inactive) {
        checkInactiveClass = "title inactive"
    } else {
        checkInactiveClass = "title"
    }

    return (
        <div className="row">
            <div className="leftBorder"></div>
            <div className={checkInactiveClass}>
                <p>{props.text}</p>
            </div>
            <div className="value"></div>
            <div className="button"></div>
        </div>
    )
}