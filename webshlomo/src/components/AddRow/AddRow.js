import React, { Component } from 'react'

export default class AddRow extends Component {
    render() {
        return (
            <div className="row">
              <div className="leftBorder"></div>
              <div className="title bold">
                <p><i className="fas fa-plus-circle"></i> Add {this.props.type}</p>
              </div>
              <div className="value"></div>
              <div className="button"></div>
            </div>
        )
    }
}
