import React, { useState } from 'react'
import './NoData.css'


export default function NoData(props) {
    
    
    return (
        <div>
            <div className="row item">
                <div className="leftBorder"></div>
                <div className="title">
                    <p className="noData">No Data available<br/>¯\_(ツ)_/¯</p>
                </div>
            </div>
        </div>

    )
}
