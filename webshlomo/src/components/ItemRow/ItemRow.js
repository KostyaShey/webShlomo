import React, { useState } from 'react'
import './ItemRow.css';
import EditItem from './EditItem/EditItem'
import ShowItem from './ShowItem/ShowItem'
import EditRecurrentItem from './EditRecurrentItem/EditRecurrentItem'

export default function ItemRow(props) {
    
    const [editMode, setEditMode] = useState(false);
    
    if (editMode && !props.isMonthData) {
        return (
            <EditItem 
                setEditMode={setEditMode}
                item={props.item}
                typeOfData={props.typeOfData}
                updateInDB={props.updateInDB}
                date={props.date}
                isMonthData={props.isMonthData}
                />
        )
    } else if (editMode && props.isMonthData) {
        return (
            <EditRecurrentItem 
                setEditMode={setEditMode}
                item={props.item}
                typeOfData={props.typeOfData}
                updateInDB={props.updateInDB}
                date={props.date}
                isMonthData={props.isMonthData}
                />
        )   
    } else {
        return (
            <ShowItem 
                setEditMode={setEditMode}
                item={props.item}
                typeOfData={props.typeOfData}
                deleteFromDB={props.deleteFromDB}
                date={props.date}
                isActive={props.isActive}
                />
        )
    }
}
