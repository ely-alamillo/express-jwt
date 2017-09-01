import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// const {Signup} = require('./pages/Signup')
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Users from './pages/Users'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>jwt-testing suite</h2>
          <Link to='/signup'> Signup</Link>
          {/* <Link></Link> */}
        </div>

        <p className="App-intro">
          login stuff coming soon
        </p>

        <Route path='/' exact component={ Signup }/>
        <Route path='/signin'  component={ Signin }/>
        <Route path='/users'  component={ Users }/>
      </div>
    );
  }
}

export default App;
