import React from 'react'
import './AddRow.css'

export default function AddRow(props) {
  
  const titles = {
    'expences': 'expences',
    'income': 'income',
    'mExpences': 'per month expences',
    'mIncome': 'per month income'
  }
  
  return (
    <div className="row">
        <div className="leftBorder"></div>
        <div className="title bold">
            <p onClick={props.changeVisibility} className="pointerOnHover"><i className="fas fa-plus-circle"></i> Add {titles[props.typeOfData]}</p>
        </div>
        <div className="value"></div>
        <div className="button"></div>
    </div>
  )
}
