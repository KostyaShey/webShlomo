import React, { Component } from 'react'

function buildRow (item) {
    return (
      <div className="row" key={item.id}>
        <div className="leftBorder"></div>
        <div className="title">
          <p>{item.name}</p>
        </div>
        <div className="value">
          <p>{item.value} €</p>
        </div>
        <div className="button">
          <p><i className="far fa-trash-alt"></i></p>
        </div>
      </div>
    )
  }

export default class ListOfItems extends Component {
    render() {
        return (
            this.props.data.map(item => buildRow(item))
        )
    }
}
