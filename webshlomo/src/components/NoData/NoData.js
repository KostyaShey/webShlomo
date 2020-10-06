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
            <p id="noData">No Data available<br/>¯\_(ツ)_/¯</p>
            {addRowVisibility && < AddRow
                                            type={props.type}
                                            changeVisibility={changeVisibility} />}
            {inputRowVisibility && <InputRow
                                            changeVisibility={changeVisibility}
                                            writeToDB={props.writeToDB}
                                            readFromDB={props.readFromDB}
                                            date={props.date}
                                            type={props.type}/>}

        </div>
    )
}
