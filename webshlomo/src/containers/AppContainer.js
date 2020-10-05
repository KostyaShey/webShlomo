import React from 'react';
import App from '../components/App/App'

export default class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  loading: true,
                        date: { currentMonth: new Date().getMonth(),
                                currentYear: new Date().getFullYear()}
                    };

        this.readFromDB = this.readFromDB.bind(this);
        this.writeToDB = this.writeToDB.bind(this);
        this.deleteFromDB = this.deleteFromDB.bind(this);
    }

    readFromDB(typeOfData, month, year) {
        fetch(`/fetch/${typeOfData}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                month: month+ 1, // + 1 because js getdate returns month as digits starting with 0
                year: year
            }
        })
        .then(response => response.json())
        .then(response => response = {[typeOfData]: response})
        .then(response => this.setState(response));
        console.log(`done fetching ${typeOfData}`)
    }

    writeToDB(data, typeOfData, month, year) {
        fetch(`/add/${typeOfData}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "name": data.name,
                "value": data.value,
                "month": month + 1, // + 1 because js getdate returns month as digits starting with 0
                "year": year
            })
        })
    }

    deleteFromDB (key, typeOfData) {
        fetch(`/delete/${typeOfData}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "id": key
            })
        })
    }

    async componentDidMount() {
        var data = {};
        
        data.expences = await fetch(`/fetch/expences`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                month: this.state.date.currentMonth + 1, // + 1 because js getdate returns month as digits starting with 0
                year: this.state.date.currentYear
            }
        })
        .then(response => response.json())
        
        data.income = await fetch(`/fetch/income`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                month: this.state.date.currentMonth + 1, // + 1 because js getdate returns month as digits starting with 0
                year: this.state.date.currentYear
            }
        })
        .then(response => response.json())

        data.loading = false;

        this.setState(data);

    }

    render() {

        return <App data={this.state}
            writeToDB={this.writeToDB}
            readFromDB={this.readFromDB}
            deleteFromDB={this.deleteFromDB} />;
    }
}