import React, { Component } from 'react'

export default class ItemRow extends Component {
    
    handleClick () {
        let id = this.props.item;
        let type = this.props.typeOfData;        
        this.props.removeRowFromList(id, type);
    } 
    
    render() {

        return (
            <div className="row" >
                <div className="leftBorder"></div>
                <div className="title">
                    <p>{this.props.item.name}</p>
                </div>
                <div className="value">
                    <p className="numbersAlign">{this.props.item.value} €</p>
                </div>
                <div className="button">
                    <button type="button" onClick={this.handleClick}>&#xf05e;</button>
                </div>
            </div>
        )
    }
}
