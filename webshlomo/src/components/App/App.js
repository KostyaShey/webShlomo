import React, { Component } from 'react'
import './App.css';
import AllRowsOfType from '../AllRowsOfType/AllRowsOfType'
import MonthChanger from '../MonthChanger/MonthChanger'
import MDataSummaryContainer from '../../containers/MDataSummaryContainer'
import BalanceRow from '../BalanceRow/BalanceRow'

export default class App extends Component {


    render() {

        return (

            <div className="App">
                 <MonthChanger 
                    date={this.props.data.date}
                    changeMonth={this.props.changeMonth}
                    readAllCollectionsFromDB={this.props.readAllCollectionsFromDB}
                    />
                <div className="monthTable">
                    {!this.props.data.loading &&  <BalanceRow
                        data = {this.props.data}
                        />}
                </div>
                <div className="monthTable">
                    {!this.props.data.loading && <AllRowsOfType
                            typeOfData={"expenses"}
                            data={this.props.data.expenses}
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
                    {!this.props.data.loading && <MDataSummaryContainer
                            typeOfData={"mExpenses"}
                            data={this.props.data.mExpenses}
                            updateInDB={this.props.updateInDB}
                            deleteFromDB={this.props.deleteFromDB}
                            writeToDB={this.props.writeToDB}
                            date={this.props.data.date}
                            />}
                    {!this.props.data.loading && <MDataSummaryContainer
                            typeOfData={"mIncome"}
                            data={this.props.data.mIncome}
                            updateInDB={this.props.updateInDB}
                            deleteFromDB={this.props.deleteFromDB}
                            writeToDB={this.props.writeToDB}
                            date={this.props.data.date}
                            />}
                </div>
            </div>
        )
    }
}
