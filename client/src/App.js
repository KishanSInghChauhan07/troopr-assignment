import React from 'react';
import './App.css';
import {Route,BrowserRouter,Switch } from 'react-router-dom';
import InfoPage from './Components/InfoPage/InfoPage.Component';
import HomePage from './Components/HomePage/HomePage.Component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/Home' component= { HomePage } />
        <Route exact path='/' component= { InfoPage } />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
