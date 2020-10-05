import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {

    render() {

        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

        return (

            <div className="App">
                <div className="monthSwitcher">
                    <div className="prevMonth">
                        <button type="button" >&#xf04a;</button>
                    </div>
                    <div className="currentMonth">
                        {month[this.props.data.date.currentMonth]}, {this.props.data.date.currentYear}
                    </div>
                    <div className="nextMonth">
                        <button type="button" >&#xf04e;</button>
                    </div>
                </div>
                <div className="monthTable">
                    <AllRowsOfType
                        type={"expences"}
                        loading={this.props.data.loading}
                        data={this.props.data.expences}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        date={this.props.data.date}
                         />
                    <AllRowsOfType
                        type={"income"}
                        loading={this.props.data.loading}
                        data={this.props.data.income}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        date={this.props.data.date} />
                </div>
            </div>
        )
    }
}
