import React from 'react'

export default function BalanceRow(props) {
    return (
        <div className="row">
            <div className="leftBorder"></div>
            <div className="title bold">
                <p>Balance:</p>
            </div>
            <div className="value bold">
                <p className='numbersAlign'>{props.data.mIncomeTotal + props.data.incomeTotal - props.data.mExpensesTotal - props.data.expensesTotal} €</p>
            </div>
            <div className="button"></div>
        </div>
    )
}
