import React from 'react';
import './App.css';
import AllRowsOfType from './components/AllRowsOfType/AllRowsOfType';

function App() {

  return (
    <div className="App">
      <div className="monthTable">
        <AllRowsOfType type={"Expences"}/>
        <AllRowsOfType type={"Income"}/>
      </div>
    </div>
  );
}

export default App;
