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
          <p>button</p>
        </div>
      </div>
    )
  }

  const expencesItems = expences.map(item => buildRow(item));
  const incomeItems = income.map(item => buildRow(item));

  function buildTitleRow(name) {
    return (
      <div className="row">
          <div className="leftBorder"></div>
          <div className="title bold">
            <p>{name}</p>
          </div>
        </div>
    )
  }

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
        </div>
    )
  }

  return (
    <div className="App">
      <div className="monthTable">
        {buildTitleRow("Expences")}
        {expencesItems}
        {buildSumRow(expences)}
        {buildTitleRow("Income")}
        {incomeItems}
        {buildSumRow(expences)}
      </div>
    </div>
  );
}

export default App;
