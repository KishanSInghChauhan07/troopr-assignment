import React from 'react';
import './App.css';
import {Route,BrowserRouter,Switch } from 'react-router-dom';
import UserDetails from './Components/UserDetails/UserDetails.Component';
import Header from './Components/Header/Header.Component';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/Users" component={UserDetails} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
