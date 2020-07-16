import React, { Component } from 'react'



export default class TitleRow extends Component {
    render() {
        return (
            <div className="row">
                <div className="leftBorder"></div>
                <div className="title bold">
                  <p>{this.props.name}</p>
                </div>
                <div className="value"></div>
                <div className="button"></div>
              </div>
        )
    }
}
