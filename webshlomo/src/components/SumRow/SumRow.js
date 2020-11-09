import React, { Component } from 'react'

export default class SumRow extends Component {
    render() {


        return (
            <div className="row">
                <div className="leftBorder"></div>
                <div className="title bold">
                  <p>Sum:</p>
                </div>
                <div className="value bold">
                  <p className='numbersAlign'>{this.props.total} €</p>
                </div>
                <div className="button"></div>
            </div>
        )
    }
}
