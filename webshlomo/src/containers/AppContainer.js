import React from 'react';
import App from '../components/App/App'

export default class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.readFromDB = this.readFromDB.bind(this);
        this.writeToDB = this.writeToDB.bind(this);
        this.mapDataFromDB = this.mapDataFromDB.bind(this);
        this.deleteFromDB = this.deleteFromDB.bind(this);
    }

    readFromDB() {
        fetch('/fetch').then(response => response.json())
            .then(response => this.mapDataFromDB(response))
            .then(response => this.setState(response))
    }

    mapDataFromDB(data) {
        let expences = [];
        let income = [];
        data.forEach(element => {
            if (element.type === 'expence') {
                expences.push(element)
            }
            if (element.type === 'income') {
                income.push(element)
            }
        })

        return { expence: expences, income: income }
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
        })
    }

    deleteFromDB (key) {
        fetch('/delete', {
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
        const responce = await fetch('/fetch');
        const json = await responce.json();
        const mappedData = this.mapDataFromDB(json)
        mappedData.loading = false;
        this.setState(mappedData)
    }

    render() {

        return <App data={this.state}
            writeToDB={this.writeToDB}
            readFromDB={this.readFromDB}
            deleteFromDB={this.deleteFromDB} />;
    }
}