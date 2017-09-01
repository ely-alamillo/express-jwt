import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: ['dummy one', 'dummy two'],
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['header_name'] = "API_KEY";
    axios.defaults.headers.common['x-access-token'] = token;
    // { headers : { 'x-access-token': token }
    axios.get('http://localhost:3030/api/showAllUsers')
      .then((data) => {
        console.log('inside users', data);
        this.setState({
          users: data.data
        })
      })
      .catch((err) => {
        alert('there has been an error in users')
      });
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.users.map((user, index) => {
              return <li key={index}>{user.username}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Users;
