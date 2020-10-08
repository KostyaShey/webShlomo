import React, { useState } from 'react'
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

    const splitData = (data) => {
        const active = data.filter(item => item.month.includes(props.date.selectedMonth + 1) && item.years.includes(props.date.selectedYear));
        const inactive = data.filter(item => !active.includes(item));
        return [active, inactive]
    }

    const [activeDataThisMonth, inactiveDataThisMonth] = splitData(props.data);

    const noData = (array) => {
        if (array.length === 0){
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            <SumMonthData 
                data={activeDataThisMonth} 
                typeOfData={props.typeOfData}
                setShowDetails={setShowDetails}
                />
            {showDetails && <TextRow 
                        text={textForActive}/>}
            {showDetails && activeDataThisMonth.map(item => <ItemRow
                        item={item}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        />)}
            {showDetails && noData(activeDataThisMonth) && <NoData />}
            {showDetails && <TextRow 
                        text={textForInactive}
                        inactive={true}
                        />}
            {showDetails && inactiveDataThisMonth.map(item => <ItemRow
                        item={item}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        inactive={true}
                        />)}
            {showDetails && noData(inactiveDataThisMonth) && <NoData />}
        </div>
    )
}
