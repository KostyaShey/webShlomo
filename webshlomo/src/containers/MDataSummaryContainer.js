import React, { useState, useEffect } from 'react'
import MDataSummary from '../components/MDataSummary/MDataSummary'

export default function MDataSummaryContainer(props) {
    
    const [didSplit, setdidSplit] = useState(false)
    const [splitData, setSplitData] = useState([])


    const splitDataFunction = (data) => {
        const newData = {}
        newData.active = data.filter(item => item.month.includes(props.date.selectedMonth + 1) && item.yearArray.includes(props.date.selectedYear));
        newData.inactive = data.filter(item => !newData.active.includes(item));
        return newData
    }
    
    useEffect(() => {
        const slitDataForState = splitDataFunction(props.data)
        console.log(slitDataForState)
        setSplitData(slitDataForState);
        if (!didSplit){
            setdidSplit(true);
        }
        
    }, [props.data])
    
    const arrayIsEmpty = (array) => {
        if (array.length === 0){
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            {didSplit && <MDataSummary
                typeOfData={props.typeOfData}
                data={splitData}
                didSplit={didSplit}
                updateInDB={props.updateInDB}
                deleteFromDB={props.deleteFromDB}
                arrayIsEmpty={arrayIsEmpty}
                date={props.data.date}
                />
            }
        </div>
    )
}
