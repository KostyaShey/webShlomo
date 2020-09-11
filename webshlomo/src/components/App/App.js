import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expence: [
                { name: 'Sex', value: 69, id: 0 },
                { name: 'Drugs', value: 666, id: 1 },
                { name: "Rock'n'Roll", value: 11, id: 2 },
                { name: 'Yo Moma', value: 420, id: 3 }
            ],
            income: [
                { name: 'Hustle', value: 100, id: 0 },
                { name: 'Hustle', value: 100, id: 1 },
                { name: 'Hustle', value: 100, id: 2 },
                { name: 'Hustle', value: 100, id: 3 },
            ]
        }
        this.addRowToList = this.addRowToList.bind(this);
        this.removeRowFromList = this.removeRowFromList.bind(this);
        this.readFromDB = this.readFromDB.bind(this);
        this.writeToDB = this.writeToDB.bind(this);
        this.mapDataFromDB = this.mapDataFromDB.bind(this);
    }

    addRowToList(newRowData, typeOfData) {
        var newData = this.state[typeOfData];
        newData.push(newRowData);
        this.setState({ [typeOfData]: newData });
    }

    removeRowFromList(rowID, typeOfData) {
        var newData = this.state[typeOfData];
        newData = newData.filter(function (obj) {
            return obj.id !== rowID;
        });
        this.setState({ [typeOfData]: newData });
    }

    mapDataFromDB(data) {
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

        return { expence: expences, income: income }
    }

    readFromDB() {
        fetch('/fetch').then(response => response.json())
            .then(response => this.mapDataFromDB(response))
            .then(response => this.setState(response));
    }

    writeToDB(data, type) {
        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "name": data.name,
                "value": data.value,
                "type": type
            })
        }).then(this.readFromDB)
    }


    render() {

        return (
            <div className="App">
                <div className="monthTable">
                    <AllRowsOfType
                        type={"expence"}
                        data={this.state["expence"]}
                        addRowToList={this.writeToDB}
                        removeRowFromList={this.removeRowFromList} />
                    <AllRowsOfType
                        type={"income"}
                        data={this.state["income"]}
                        addRowToList={this.writeToDB}
                        removeRowFromList={this.removeRowFromList} />
                </div>
                <br />
                <button onClick={this.readFromDB}>
                    fetch data from mongo
                </button>
            </div>
        )
    }
}
