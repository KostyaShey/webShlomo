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

  class TitleRow extends React.Component {
    
    render (){
      return (
        <div className="row">
            <div className="leftBorder"></div>
            <div className="title bold">
              <p>{this.props.name}</p>
            </div>
            <div className="value"></div>
            <div className="button"></div>
          </div>
      )
    }
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

  class ListOfItems extends React.Component {
    render () {
      return (
        this.props.data.map(item => buildRow(item))
      )
    }
  }

  class SumRow extends React.Component {

    render () {

      const valueSum = this.props.data.reduce((currentSum, array) => currentSum + array.value, 0);

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
    )}
  }

  class AddRow extends React.Component {
    render () {
      return (
        <div className="row">
          <div className="leftBorder"></div>
          <div className="title bold">
            <p><i className="fas fa-plus-circle"></i> Add {this.props.type}</p>
          </div>
          <div className="value"></div>
          <div className="button"></div>
        </div>
    )}
  }

  return (
    <div className="App">
      <div className="monthTable">
        <TitleRow name={"Expences"} />
        <ListOfItems data={expences} />
        <AddRow type={"Expences"} />
        <SumRow data={expences} />
        <TitleRow name={"Income"} />
        <ListOfItems data={income} />
        <AddRow type={"Income"} />
        <SumRow data={income} />
      </div>
    </div>
  );
}

export default App;
