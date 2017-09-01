import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsername(event) {
    this.setState({ username: event.target.value })
  }
  handlePassword(event) {
    this.setState({ password: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, password} = this.state;
    // axios.defaults.withCredentials = true;
    axios.post('http://localhost:3030/api/signup', { username, password})
      .then((data) => {
        window.location = '/signin'
      })
      .catch((err) => {
        console.log(err);
        alert('there was an error');
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.username} type='text' placeholder='Enter a username' onChange={this.handleUsername}></input>
          <input value={this.state.password} type='text' placeholder='Enter a password' onChange={this.handlePassword}></input>
          <button type='submit'> Submit </button>
        </form>
      </div>
    )
  }
}

export default Signup;
