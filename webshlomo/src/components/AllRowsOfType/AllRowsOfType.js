import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'


var data = {
    "Expences": [
        { name: 'Sex', value: 69, id: 1 },
        { name: 'Drugs', value: 666, id: 2 },
        { name: "Rock'n'Roll", value: 11, id: 3 },
        { name: 'Yo Moma', value: 420, id: 4 }
      ],
    "Income": [
        { name: 'Hustle', value: 100, id: 1 },
        { name: 'Hustle', value: 100, id: 2 },
        { name: 'Hustle', value: 100, id: 3 },
        { name: 'Hustle', value: 100, id: 4 },
    ]
}



export default class AllRowsOfType extends Component {

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                <ListOfItems data={data[this.props.type]} />
                <SumRow data={data[this.props.type]} />
                <AddRow type={this.props.type} />
            </div>
        )
    }
}
