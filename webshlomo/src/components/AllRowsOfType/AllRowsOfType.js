import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'

export default class AllRowsOfType extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showAddRow: true,
             showInputRow: false,
             Expences: [
                { name: 'Sex', value: 69, id: 0 },
                { name: 'Drugs', value: 666, id: 1 },
                { name: "Rock'n'Roll", value: 11, id: 2 },
                { name: 'Yo Moma', value: 420, id: 3 }
              ],
              Income: [
                { name: 'Hustle', value: 100, id: 0 },
                { name: 'Hustle', value: 100, id: 1 },
                { name: 'Hustle', value: 100, id: 2 },
                { name: 'Hustle', value: 100, id: 3 },
            ]
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        this.addRowToList = this.addRowToList.bind(this);
    }
    
    changeVisibility (componentName) {
        if (componentName === 'showInputRow') {
            this.setState({showInputRow: !this.state.showInputRow})
            this.setState({showAddRow: !this.state.showAddRow})
        };
        if (componentName === 'showAddRow') {
            this.setState({showAddRow: !this.state.showAddRow})
            this.setState({showInputRow: !this.state.showInputRow})
        };
    }

    addRowToList (newRowData, typeOfData) {
        alert(JSON.stringify(newRowData));
/*         const newData = this.state[typeOfData].push(newRowData);
        alert(JSON.stringify(newData));
        this.setState({[typeOfData]: newData}); */
    }

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                <ListOfItems data={this.state[this.props.type]} />
                <SumRow data={this.state[this.props.type]} />
                {this.state.showAddRow && < AddRow 
                                                type={this.props.type} 
                                                onClick={this.changeVisibility}/>}
                {this.state.showInputRow && <InputRow 
                                                onClick={this.changeVisibility}
                                                onSubmit={this.addRowToList}
                                                type={this.props.type} 
                                                data={this.state[this.props.type]} />}
            </div>
        )
    }
}
