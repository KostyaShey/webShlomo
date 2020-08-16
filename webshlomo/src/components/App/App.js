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
        this.testButton = this.testButton.bind(this);
        this.writeToDB = this.writeToDB.bind(this);
        this.mapDataFromDB = this.mapDataFromDB.bind(this);
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
    
    mapDataFromDB (data) {
        let expences = [];
        let income = [];
        data.forEach(element => {
            if (element.type === 'expence') {
                expences.push(element)
                console.log("added " + element + " to expences")
            }
            if (element.type === 'income') {
                income.push(element)
                console.log("added " + element + " to income")
            }
        })

        return {Expences: expences, Income : income}
    }

    testButton () {
        fetch('/fetch').then(response => response.json())
        .then(response => this.mapDataFromDB(response))
        .then(response => this.setState(response));
    }

    writeToDB () {
        fetch('/add', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              },
              body: JSON.stringify({ 
                "name": "hello form react",
                "value": 11
                })
          })
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
                <br />
                <button onClick={this.testButton}>
                    fetch data from mongo
                </button>
                <button onClick={this.writeToDB}>
                    add data to mongo
                </button>
            </div>
        )
    }
}
