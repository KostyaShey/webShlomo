import React from 'react'
import './SumMonthData.css';

export default function SumMonthData(props) {

    const titles = {
        'mExpenses': 'expenses',
        'mIncome': 'income'
      }

    const valueSum = props.data.reduce((currentSum, array) => currentSum + array.value, 0);
    
    return (
        <div className="row">
            <div className="leftBorder"></div>
            <div className="title bold">
                <p>Total monthly {titles[props.typeOfData]}</p>
            </div>
            <div className="value bold">
                <p className='numbersAlign'>{valueSum} €</p>
            </div>
            <div className="button expand">
                <button type="button" onClick={() => props.setShowDetails((prev) => !prev)}>&#xf150;</button>
            </div>
        </div>
    )
}
