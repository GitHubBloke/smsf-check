import React, { Component } from 'react';
import { Link } from 'react-router';

import DocumentTitle from 'react-document-title';

export default class RegisterPage extends Component {
  render() {
    return (
      <DocumentTitle title='SMSF Health Check - Register'>
        <div>
          <p>So we can remember who you are, and identify your fund, please enter the details below.</p>
          <p>Already registered? <Link to='login'>Log In</Link></p>
        </div>
      </DocumentTitle>
    );
  }
}