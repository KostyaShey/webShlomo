import React, { useEffect, useRef } from 'react'
import './MonthChanger.css';

export default function MonthChanger(props) {
    
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const handleClickNext = () => {
        props.changeMonth(1);
    }

    const handleClickBack = () => {
        props.changeMonth(-1);
    }

    const didMountRef = useRef(false) // preventing useEffect to run on the fist page load

    useEffect(() => {
        if (didMountRef.current){
            props.readAllCollectionsFromDB(props.date.selectedMonth, props.date.selectedYear)
        } else didMountRef.current = true
    }, [props.date.selectedMonth])

    return (
        <div className="monthChanger">
                <div className="prevMonth">
                    <button type="button" onClick={handleClickBack}>&#xf04a;</button>
                </div>
                <div className="currentMonth">
                    {month[props.date.selectedMonth]}, {props.date.selectedYear}
                </div>
                <div className="nextMonth">
                    <button type="button" onClick={handleClickNext}>&#xf04e;</button>
                </div>
        </div>
    )
}
