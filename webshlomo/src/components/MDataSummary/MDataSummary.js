import React, { useState } from 'react'
import SumMonthData from '../SumMonthData/SumMonthData'
import ItemRow from '../ItemRow/ItemRow'
import './MDataSummary.css';

export default function MDataSummary(props) {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <div>
            <SumMonthData 
                data={props.data} 
                typeOfData={props.typeOfData}
                setShowDetails={setShowDetails}
                />
            {showDetails && props.data.map(item => <ItemRow
                        item={item}
                        key={item._id['$oid']} />)}
        </div>
    )
}
