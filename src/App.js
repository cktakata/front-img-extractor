import React from 'react';
import './App.css';
import Search from './main/search';
import Result from './main/result';

function App() {
  return (
    <div className="App">

      <br />
      <div className='container'>
        IMAGE EXTRACTOR - By Carlos Kenji Takata
      </div>
      <br />

      <Search />
      <br />
      <Result />
    </div>
  );
}

export default App;
