import React from 'react'

export default function TitleRow(props) {
  
  const titles = {
    'expences': 'Expences',
    'income': 'Income',
    'mExpences': 'Per Month Expences',
    'mIncome': 'Per Month Income'
  }
  
  return (
    <div className="row">
      <div className="leftBorder"></div>
      <div className="title bold">
        <p>{titles[props.name].toUpperCase()}</p>
      </div>
      <div className="value"></div>
      <div className="button"></div>
    </div>
  )
}