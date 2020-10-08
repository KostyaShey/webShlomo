import React, { useState } from 'react'
import './NoData.css'
import InputRow from '../InputRow/InputRow'
import AddRow from '../AddRow/AddRow'

export default function NoData(props) {
    
    const [addRowVisibility, setaddRowVisibility] = useState(true)
    const [inputRowVisibility, setInputRowVisibility] = useState(false)

    const changeVisibility = () => {

        setaddRowVisibility((prev) => !prev)
        setInputRowVisibility((prev) => !prev)

    }
    
    return (
        <div>
        <div className="row item">
            <div className="leftBorder"></div>
            <div className="title">
            <p className="noData">No Data available<br/>¯\_(ツ)_/¯</p>
            </div>
            

        </div>
        {addRowVisibility && < AddRow
            type={props.type}
            changeVisibility={changeVisibility} />}
        {inputRowVisibility && <InputRow
            changeVisibility={changeVisibility}
            writeToDB={props.writeToDB}
            date={props.date}
            typeOfData={props.typeOfData}/>}</div>
    )
}
