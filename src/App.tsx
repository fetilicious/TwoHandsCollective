import React from 'react';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className="App-Container">
        <Homepage></Homepage>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
