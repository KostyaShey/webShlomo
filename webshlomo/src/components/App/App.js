import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'

export default class App extends Component {

    state={
        curTime : new Intl.DateTimeFormat('en-US', { month: 'long'}).format(new Date())
    }

    render() {

        return (

            <div className="App">
                <div className="monthSwitcher">
                    <div className="prevMonth">
                        <button type="button" >&#xf04a;</button>
                    </div>
                    <div className="currentMonth">
                        {this.state.curTime}
                    </div>
                    <div className="nextMonth">
                        <button type="button" >&#xf04e;</button>
                    </div>
                </div>
                <div className="monthTable">
                    <AllRowsOfType
                        type={"expence"}
                        loading={this.props.data.loading}
                        data={this.props.data.expence}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB} />
                    <AllRowsOfType
                        type={"income"}
                        loading={this.props.data.loading}
                        data={this.props.data.income}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB} />
                </div>
            </div>
        )
    }
}
