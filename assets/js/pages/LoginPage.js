import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import locals from '../utils/locals';

export default class LoginPage extends Component {
  render() {
    return (
      <DocumentTitle title={`${locals.name} - Login`}>
        <div>
          <h1>Log In</h1>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <form>
              <div className='form-group col-md-6'>
                <input type='text' className='form-control input-lg' placeholder='Enter your email...' />
              </div>
              <div className='form-group col-md-6'>
                <input type='password' className='form-control input-lg' placeholder='Enter your password...' />
              </div>
            </form>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit'>Log In to your Health Check</button>
          <p className='append-xs-none'>Need an account? <Link to='app'>Register</Link></p>
        </div>
      </DocumentTitle>
    );
  }
}
