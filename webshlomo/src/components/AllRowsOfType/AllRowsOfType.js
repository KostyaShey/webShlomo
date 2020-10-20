import React, { useState } from 'react'
import AddRow from '../AddRow/AddRow'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'
import ItemRow from '../ItemRow/ItemRow'
import NoData from '../NoData/NoData'

export default function AllRowsOfType(props) {

    const [showInputRow, setShowInputRow] = useState(false)

    if (props.data.length === 0){
        return (
            <div>
                <div>
                    <TitleRow name={props.typeOfData} />
                    <NoData 
                        typeOfData={props.typeOfData}
                        writeToDB={props.writeToDB}
                        date={props.date}
                        />
                </div>
            </div>
        )
    } else {
        return (
                <div>
                    <TitleRow name={props.typeOfData} />
                    {props.data.map(item => <ItemRow
                        item={item}
                        typeOfData={props.typeOfData}
                        deleteFromDB={props.deleteFromDB}
                        updateInDB={props.updateInDB}
                        date={props.date}
                        key={item._id['$oid']}
                        isActive={true} 
                        />)}
                    <SumRow data={props.data} />
                    {!showInputRow && < AddRow
                        setShowInputRow={setShowInputRow}
                        showInputRow={showInputRow}
                        typeOfData={props.typeOfData}
                        />}
                    {showInputRow && <InputRow
                        setShowInputRow={setShowInputRow}
                        showInputRow={showInputRow}
                        writeToDB={props.writeToDB}
                        date={props.date}
                        typeOfData={props.typeOfData}
                        />}
                </div>
                )
    }

    
}
