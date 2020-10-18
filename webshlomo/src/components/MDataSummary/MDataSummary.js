import React, { useState } from 'react'
import SumMonthData from '../SumMonthData/SumMonthData'
import ItemRow from '../ItemRow/ItemRow'
import TextRow from '../TextRow/TextRow'
import NoData from '../NoData/NoData'
import './MDataSummary.css';

export default function MDataSummary(props) {

    const titles = {
        'mExpenses': 'Monthly expenses',
        'mIncome': 'Monthly income'
      }

    const textForActive = `${titles[props.typeOfData]} this month`
    const textForInactive = `${titles[props.typeOfData]} in other month`

    const [showDetails, setShowDetails] = useState(false)

    return (
        <div>
            {props.didSplit && <SumMonthData 
                data={props.data.active} 
                typeOfData={props.typeOfData}
                setShowDetails={setShowDetails}
                />}
            {showDetails && <TextRow 
                        text={textForActive}
                        isActive={true}/>}
            {showDetails && props.data.active.map(item => <ItemRow
                        item={item}
                        typeOfData={props.typeOfData}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        updateInDB={props.updateInDB}
                        isMonthData={true}
                        isActive={true}
                        />)}
            {showDetails && props.arrayIsEmpty(props.data.active) && <NoData />}
            {showDetails && <TextRow 
                        text={textForInactive}
                        isActive={false}
                        />}
            {showDetails && props.data.inactive.map(item => <ItemRow
                        item={item}
                        typeOfData={props.typeOfData}
                        key={item._id['$oid']}
                        deleteFromDB={props.deleteFromDB}
                        updateInDB={props.updateInDB}
                        isActive={false}
                        isMonthData={true}
                        />)}
            {showDetails && props.arrayIsEmpty(props.data.inactive) && <NoData />}
        </div>
    )
}
