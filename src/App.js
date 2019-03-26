import React from 'react';
import './App.css';
import Router from './Router';
import NavBar from './components/NavBar';

class App extends React.Component {
  
  render() {

    return (
      <>
        <NavBar />
        <Router /> 
      </>
    )
  }
}

export default App
