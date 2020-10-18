import React, {useRef} from 'react'

export default function TextRow(props) {
  
    const checkInactiveClass = useRef('')

    if (!props.isActive) {
        checkInactiveClass.current = "title inactive"
    } else {
        checkInactiveClass.current = "title"
    }

    return (
        <div className="row">
            <div className="leftBorder"></div>
            <div className={checkInactiveClass.current}>
                <p>{props.text}</p>
            </div>
            <div className="value"></div>
            <div className="button"></div>
        </div>
    )
}