import React from 'react';
import './App.css';

function App() {

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

  function buildTitleRow(name) {
    return (
      <div className="row">
          <div className="leftBorder"></div>
          <div className="title bold">
            <p>{name}</p>
          </div>
          <div className="value"></div>
          <div className="button"></div>
        </div>
    )
  }

  function buildRow (item) {
    return (
      <div className="row">
        <div className="leftBorder"></div>
        <div className="title">
          <p>{item.name}</p>
        </div>
        <div className="value">
          <p>{item.value} €</p>
        </div>
        <div className="button">
          <p><i className="far fa-trash-alt"></i></p>
        </div>
      </div>
    )
  }

  const expencesItems = expences.map(item => buildRow(item));
  const incomeItems = income.map(item => buildRow(item));

  function buildSumRow(data){
    
    let valueSum = data.reduce((currentSum, array) => currentSum + array.value, 0);
    
    return (
      <div className="row">
          <div className="leftBorder"></div>
          <div className="title bold">
            <p>Sum:</p>
          </div>
          <div className="value bold">
            <p >{valueSum} €</p>
          </div>
          <div className="button"></div>
        </div>
    )
  }

  function buildAddRow (name) {
    return (
      <div className="row">
          <div className="leftBorder"></div>
          <div className="title bold">
            <p><i className="fas fa-plus-circle"></i> Add {name}</p>
          </div>
          <div className="value"></div>
          <div className="button"></div>
        </div>
    )
  }

  return (
    <div className="App">
      <div className="monthTable">
        {buildTitleRow("Expences")}
        {expencesItems}
        {buildAddRow("Expences")}
        {buildSumRow(expences)}
        {buildTitleRow("Income")}
        {incomeItems}
        {buildAddRow("Income")}
        {buildSumRow(expences)}
      </div>
    </div>
  );
}

export default App;
