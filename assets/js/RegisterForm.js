import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RegisterForm extends Component {
  render() {
    return (
      <div>
        <p>So we can remember who you are, and identify your fund, please enter the details below.</p>
        <p>Already registered? <Link to='login'>Log In</Link></p>
      </div>
    );
  }
}
