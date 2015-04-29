import React, { Component } from 'react';
import { Link } from 'react-router';

import DocumentTitle from 'react-document-title';

export default class LoginPage extends Component {
  render() {
    return (
      <DocumentTitle title='SMSF Health Check - Login'>
        <div>
          <h1>Log In</h1>
          <p>Need an account? <Link to='app'>Register</Link></p>
        </div>
      </DocumentTitle>
    );
  }
}
