import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <p>Need an account? <Link to='app'>Register</Link></p>
      </div>
    );
  }
}
