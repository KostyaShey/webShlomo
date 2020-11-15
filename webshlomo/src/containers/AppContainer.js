import React from 'react';
import App from '../components/App/App'

export default class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  loading: true,
                        date: { currentMonth: new Date().getMonth(),
                                currentYear: new Date().getFullYear(),
                                selectedMonth: new Date().getMonth(),
                                selectedYear: new Date().getFullYear()
                            }
                    };

        this.readFromDB = this.readFromDB.bind(this);
        this.writeToDB = this.writeToDB.bind(this);
        this.deleteFromDB = this.deleteFromDB.bind(this);
        this.updateInDB = this.updateInDB.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.readAllCollectionsFromDB = this.readAllCollectionsFromDB.bind(this);
    }

    readFromDB(typeOfData, month, year) {
        fetch(`/fetch/${typeOfData}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                month: month + 1, // + 1 because js getdate returns month as digits starting with 0
                year: year,
                typeOfData: typeOfData 
            }
        })
        .then(response => response.json())
        .then(response => response = {[typeOfData]: response.data,
                                     [typeOfData+"Total"]: response.total[0].total })
        .then(response => this.setState(response));
        console.log(`readFromDB is done fetching ${typeOfData}`)
    }

    readAllCollectionsFromDB(month, year) {
        const collections = ['income', 'expenses', 'mExpenses', 'mIncome']
        for(var i=0; i<collections.length; i++){
            this.readFromDB(collections[i], month, year)
        } 
    }

    writeToDB(newData, typeOfData) {
        fetch(`/add/${typeOfData}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newData)
        })
        .then(response => response.json())
        .then(response => response = {[typeOfData]: response.data,
                                     [typeOfData+"Total"]: response.total[0].total })
        .then(response => this.setState(response));

    }

    deleteFromDB (key, typeOfData) {

        var month = this.state.date.selectedMonth + 1; // + 1 because js getdate returns month as digits starting with 0
        var year = this.state.date.selectedYear;        

        fetch(`/delete/${typeOfData}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "id": key,
                "month": month,
                "year": year
            })
        })
        .then(response => response.json())
        .then(response => response = {[typeOfData]: response.data,
            [typeOfData+"Total"]: response.total[0].total })
        .then(response => this.setState(response));
    }

    updateInDB (updatedData, typeOfData) {
        
        updatedData.selectedMonth = this.state.date.selectedMonth;
        updatedData.selectedYear = this.state.date.selectedYear;
        console.log(typeof(updatedData))
        console.log(updatedData);

        fetch(`/update/${typeOfData}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(response => response = {[typeOfData]: response.data,
            [typeOfData+"Total"]: response.total[0].total })
        .then(response => this.setState(response));
    }

    changeMonth (increment) {

        var newMonth = this.state.date.selectedMonth;
        var newYear = this.state.date.selectedYear;

        if (this.state.date.selectedMonth === 11 && increment > 0) {
            newMonth = 0;
            newYear = newYear + 1;
        } else if (this.state.date.selectedMonth === 0 && increment < 0) {
            newMonth = 11;
            newYear = newYear - 1;
        } else {
            newMonth = newMonth + increment;
        }

        this.setState({date: {
            ...this.state.date,
            selectedMonth: newMonth,
            selectedYear: newYear
        }})

    }  

    async componentDidMount() {
        var data = {};

        const collections = ['income', 'expenses', 'mExpenses', 'mIncome']
        for(var i=0; i<collections.length; i++){
            data[collections[i]] = await fetch(`/fetch/${collections[i]}`,{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    month: this.state.date.currentMonth + 1, // + 1 because js getdate returns month as digits starting with 0
                    year: this.state.date.currentYear,
                    typeOfData: collections[i]
                }
            })
            .then(response => response.json())
            .then(response => {data[collections[i]+'Total'] = response.total[0].total
                return response.data})
        } 

        data.loading = false;
        this.setState(data);
    }

    render() {

        return <App data={this.state}
            writeToDB={this.writeToDB}
            readFromDB={this.readFromDB}
            deleteFromDB={this.deleteFromDB}
            updateInDB={this.updateInDB} 
            changeMonth={this.changeMonth}
            readAllCollectionsFromDB={this.readAllCollectionsFromDB}
            />;
    }
}