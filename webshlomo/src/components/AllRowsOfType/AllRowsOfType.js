import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'

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

    constructor(props) {
        super(props)
    
        this.state = {
             showAddRow: true,
             showInputRow: false,
             data: {
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
        }
        this.changeVisibility = this.changeVisibility.bind(this);
    }
    
    changeVisibility (componentName) {
        console.log(componentName);
        if (componentName === 'showInputRow') {
            this.setState({showInputRow: !this.state.showInputRow})
            this.setState({showAddRow: !this.state.showAddRow})
        };
        if (componentName === 'showAddRow') {
            this.setState({showAddRow: !this.state.showAddRow})
            this.setState({showInputRow: !this.state.showInputRow})
        };
    }

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                <ListOfItems data={data[this.props.type]} />
                <SumRow data={data[this.props.type]} />
                {this.state.showAddRow && < AddRow type={this.props.type} onClick={this.changeVisibility}/>}
                {this.state.showInputRow && <InputRow onClick={this.changeVisibility} data={this.state[this.props.type]} />}
            </div>
        )
    }
}
