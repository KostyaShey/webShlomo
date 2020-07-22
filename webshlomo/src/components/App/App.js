import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {
    
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
        var newData = this.state[typeOfData];
        newData.push(newRowData);
        this.setState({[typeOfData]: newData});
    }
    
    render() {
        return (
            <div className="App">
                <div className="monthTable">
                    <AllRowsOfType 
                        type={"Expences"} 
                        data={this.state["Expences"]}
                        addRowVisibility={this.state.showAddRow}
                        inputRowVisibility={this.state.showInputRow}
                        changeVisibility={this.changeVisibility}
                        addRowToList={this.addRowToList} />
                    <AllRowsOfType 
                        type={"Income"}
                        data={this.state["Income"]}
                        addRowVisibility={this.state.showAddRow}
                        inputRowVisibility={this.state.showInputRow}
                        changeVisibility={this.changeVisibility}
                        addRowToList={this.addRowToList} />
                </div>
            </div>
        )
    }
}
