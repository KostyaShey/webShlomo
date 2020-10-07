import React, { useState } from 'react'
import './ItemRow.css';
import EditItem from './EditItem/EditItem'
import ShowItem from './ShowItem/ShowItem'

export default function ItemRow(props) {
    
    const [editMode, setEditMode] = useState(false);

    const handleClickEdit = () => {
        setEditMode((prev) => !prev)
    }
    
    if (editMode) {
        return (
            <EditItem 
                setEditMode={setEditMode}
                item={props.item}
                typeOfData={props.typeOfData}
                readFromDB={props.readFromDB}
                updateInDB={props.updateInDB}
                date={props.date}/>
        )
    } else {
        return (
            <ShowItem 
                setEditMode={setEditMode}
                item={props.item}
                typeOfData={props.typeOfData}
                deleteFromDB={props.deleteFromDB}
                readFromDB={props.readFromDB}
                date={props.date}
                />
        )
    }
}
