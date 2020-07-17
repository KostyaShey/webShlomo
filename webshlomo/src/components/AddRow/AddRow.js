import React, { Component } from 'react'

export default class AddRow extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
         visible: true
      }
    }
    
  
    render() {
        return (
            <div className="row">
              <div className="leftBorder"></div>
              <div className="title bold">
                <p onClick={this.props.handleClick}><i className="fas fa-plus-circle"></i> Add {this.props.type}</p>
                <button onClick={this.props.handleClick}>click me</button>
              </div>
              <div className="value"></div>
              <div className="button"></div>
            </div>
        )
    }
}
