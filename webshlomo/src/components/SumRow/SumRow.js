import React, { Component } from 'react'

export default class SumRow extends Component {
    render() {

        const valueSum = this.props.data.reduce((currentSum, array) => currentSum + array.value, 0);

        return (
            <div className="row">
                <div className="leftBorder"></div>
                <div className="title bold">
                  <p>Sum:</p>
                </div>
                <div className="value bold">
                  <p className='numbersAlign'>{valueSum} €</p>
                </div>
                <div className="button"></div>
            </div>
        )
    }
}
