import React, { Component } from 'react'
import ItemRow from '../ItemRow/ItemRow'

export default class ListOfItems extends Component {
    render() {
        return (
            this.props.data.map(item => <ItemRow item={item} />)
        )
    }
}
