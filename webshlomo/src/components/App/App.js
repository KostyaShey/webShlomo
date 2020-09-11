import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {

    render() {

        console.log(JSON.stringify(this.props.data))

        return (

            <div className="App">
                <div className="monthTable">
                    <AllRowsOfType
                        type={"expence"}
                        data={this.props.data.expence}
                        addRowToList={this.props.writeToDB} />
                    <AllRowsOfType
                        type={"income"}
                        data={this.props.data.income}
                        addRowToList={this.props.writeToDB} />
                </div>
            </div>
        )
    }
}
