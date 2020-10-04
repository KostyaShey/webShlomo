import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {

    render() {

        return (

            <div className="App">
                <div className="monthTable">
                    <AllRowsOfType
                        type={"expence"}
                        loading={this.props.data.loading}
                        data={this.props.data.expence}
                        writeToDB={this.props.writeToDB} />
                    <AllRowsOfType
                        type={"income"}
                        loading={this.props.data.loading}
                        data={this.props.data.income}
                        writeToDB={this.props.writeToDB} />
                </div>
            </div>
        )
    }
}
