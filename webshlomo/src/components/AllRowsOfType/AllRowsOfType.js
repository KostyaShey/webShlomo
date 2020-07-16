import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'

const expences = [
    { name: 'Sex', value: 69 },
    { name: 'Drugs', value: 666 },
    { name: "Rock'n'Roll", value: 11 },
    { name: 'Yo Moma', value: 69 }
  ];

  const income = [
      { name: 'Hustle', value: 100 },
      { name: 'Hustle', value: 100 },
      { name: 'Hustle', value: 100 },
      { name: 'Hustle', value: 100 },
  ];

export default class AllRowsOfType extends Component {
    render() {
        return (
            <div className="monthTable">
                <TitleRow name="Expences" />
                <ListOfItems data={expences} />
                <SumRow data={expences} />
                <AddRow type="Expences" />
                <TitleRow name="Income" />
                <ListOfItems data={income} />
                <SumRow data={income} />
                <AddRow type="Income" />
            </div>
        )
    }
}
