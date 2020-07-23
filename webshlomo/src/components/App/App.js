import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
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
        this.addRowToList = this.addRowToList.bind(this);
        this.removeRowFromList = this.removeRowFromList.bind(this);
    }

    addRowToList (newRowData, typeOfData) {
        var newData = this.state[typeOfData];
        newData.push(newRowData);
        this.setState({[typeOfData]: newData});
    }

    removeRowFromList (rowID, typeOfData) {
        var newData = this.state[typeOfData];
        newData = newData.filter(function(obj) {
            return obj.id !== rowID;
        });
        this.setState({[typeOfData]: newData});
    }
    
    render() {
        return (
            <div className="App">
                <div className="monthTable">
                    <AllRowsOfType 
                        type={"Expences"} 
                        data={this.state["Expences"]}
                        addRowToList={this.addRowToList} 
                        removeRowFromList={this.removeRowFromList}/>
                    <AllRowsOfType 
                        type={"Income"}
                        data={this.state["Income"]}
                        addRowToList={this.addRowToList}
                        removeRowFromList={this.removeRowFromList} />
                </div>
            </div>
        )
    }
}
