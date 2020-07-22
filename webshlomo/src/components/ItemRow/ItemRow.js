import React, { Component } from 'react'

export default class ItemRow extends Component {
    render() {
        return (
            <div className="row" key={this.props.item.id}>
                <div className="leftBorder"></div>
                <div className="title">
                    <p>{this.props.item.name}</p>
                </div>
                <div className="value">
                    <p className="numbersAlign">{this.props.item.value} €</p>
                </div>
                <div className="button">
                    <button type="button">&#xf05e;</button>
                </div>
            </div>
        )
    }
}
