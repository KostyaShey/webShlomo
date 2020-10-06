import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'
import MonthChanger from '../MonthChanger/MonthChanger'

export default class App extends Component {

    render() {

        return (

            <div className="App">
                <MonthChanger 
                    date={this.props.data.date}
                    changeMonth={this.props.changeMonth}
                    readAllCollectionsFromDB={this.props.readAllCollectionsFromDB}/>
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
