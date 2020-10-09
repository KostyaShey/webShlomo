import React, { useState, useEffect, useRef } from 'react'
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

    const activeDataThisMonth = useRef([])
    const inactiveDataThisMonth = useRef([])

    const splitData = (data) => {
        const active = data.filter(item => item.month.includes(props.date.selectedMonth + 1) && item.years.includes(props.date.selectedYear));
        const inactive = data.filter(item => !active.includes(item));
        console.log('slit data complete')
        return [active, inactive]
    }

    const noData = (array) => {
        if (array.length === 0){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        [activeDataThisMonth.current, inactiveDataThisMonth.current] = splitData(props.data);
        console.log(activeDataThisMonth.current)
        if (!didSplit){
            setdidSplit(true);
        }
        
    }, [props.date.selectedMonth])

    return (
        <div>
            {didSplit && <SumMonthData 
                data={activeDataThisMonth.current} 
                typeOfData={props.typeOfData}
                setShowDetails={setShowDetails}
                />}
            {showDetails && <TextRow 
                        text={textForActive}/>}
            {showDetails && activeDataThisMonth.current.map(item => <ItemRow
                        item={item}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        />)}
            {showDetails && noData(activeDataThisMonth.current) && <NoData />}
            {showDetails && <TextRow 
                        text={textForInactive}
                        inactive={true}
                        />}
            {showDetails && inactiveDataThisMonth.current.map(item => <ItemRow
                        item={item}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        inactive={true}
                        />)}
            {showDetails && noData(inactiveDataThisMonth.current) && <NoData />}
        </div>
    )
}
