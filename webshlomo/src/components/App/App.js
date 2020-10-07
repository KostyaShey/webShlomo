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
                {!this.props.data.loading && <AllRowsOfType
                        typeOfData={"expences"}
                        data={this.props.data.expences}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        updateInDB={this.props.updateInDB}
                        date={this.props.data.date}
                         />}
                {!this.props.data.loading && <AllRowsOfType
                        typeOfData={"income"}
                        data={this.props.data.income}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        updateInDB={this.props.updateInDB}
                        date={this.props.data.date} />}
            </div>
            <div className="monthTable">
                {!this.props.data.loading && <AllRowsOfType
                        typeOfData={"mExpences"}
                        data={this.props.data.mExpences}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        updateInDB={this.props.updateInDB}
                        date={this.props.data.date} />}
                {!this.props.data.loading && <AllRowsOfType
                        typeOfData={"mIncome"}
                        data={this.props.data.mIncome}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        deleteFromDB={this.props.deleteFromDB}
                        updateInDB={this.props.updateInDB}
                        date={this.props.data.date} />}
            </div>
            </div>
        )
    }
}
