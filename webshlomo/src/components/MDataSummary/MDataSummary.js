import React, { useState, useEffect } from 'react'
import SumMonthData from '../SumMonthData/SumMonthData'
import ItemRow from '../ItemRow/ItemRow'
import TextRow from '../TextRow/TextRow'
import NoData from '../NoData/NoData'
import './MDataSummary.css';

export default function MDataSummary(props) {

    const titles = {
        'mExpences': 'Monthly expences',
        'mIncome': 'Monthly income'
      }

    const textForActive = `${titles[props.typeOfData]} this month`
    const textForInactive = `${titles[props.typeOfData]} in other month`

    const [showDetails, setShowDetails] = useState(false)
    const [didSplit, setdidSplit] = useState(false)
    const [splitData, setSplitData] = useState([])


    const splitDataFunction = (data) => {
        const newData = {}
        newData.active = data.filter(item => item.month.includes(props.date.selectedMonth + 1) && item.year.includes(props.date.selectedYear));
        newData.inactive = data.filter(item => !newData.active.includes(item));
        return newData
    }

    const noData = (array) => {
        if (array.length === 0){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        const slitDataForState = splitDataFunction(props.data)
        console.log(slitDataForState)
        setSplitData(slitDataForState);
        if (!didSplit){
            setdidSplit(true);
        }
        
    }, [props.data])

    return (
        <div>
            {didSplit && <SumMonthData 
                data={splitData.active} 
                typeOfData={props.typeOfData}
                setShowDetails={setShowDetails}
                />}
            {showDetails && <TextRow 
                        text={textForActive}
                        isActive={true}/>}
            {showDetails && splitData.active.map(item => <ItemRow
                        item={item}
                        typeOfData={props.typeOfData}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        updateInDB={props.updateInDB}
                        isMonthData={true}
                        isActive={true}
                        />)}
            {showDetails && noData(splitData.active) && <NoData />}
            {showDetails && <TextRow 
                        text={textForInactive}
                        isActive={false}
                        />}
            {showDetails && splitData.inactive.map(item => <ItemRow
                        item={item}
                        typeOfData={props.typeOfData}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        updateInDB={props.updateInDB}
                        isActive={false}
                        isMonthData={true}
                        />)}
            {showDetails && noData(splitData.inactive) && <NoData />}
        </div>
    )
}
