import logo from './logo.svg';
import React from 'react'
import './App.css';
import PosterForm from './components/PosterForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Posterize</h1>
        {PosterForm()}
      </header>
    </div>
  );
}

export default App;
