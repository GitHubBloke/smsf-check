import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import AuthActionCreators from '../actions/AuthActionCreators';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';

export default class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('signin');
    this.state = { email: '', password: '' };
  }

  handleChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  signin(e) {
    AuthActionCreators.signin(this.state.email, this.state.password);
    e.preventDefault();
  }

  render() {
    return (
      <DocumentTitle title={`${locals.name} - Login`}>
        <form onSubmit={this.signin}>
          <h1>Log In</h1>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <div className='form-group col-md-6'>
              <input type='text' className='form-control input-lg' placeholder='Enter your email...'
                value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
            </div>
            <div className='form-group col-md-6'>
              <input type='password' className='form-control input-lg' placeholder='Enter your password...'
                value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
            </div>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit'>Log In to your Health Check</button>
          <p className='append-xs-none'>Need an account? <Link to='app'>Register</Link></p>
        </form>
      </DocumentTitle>
    );
  }
}
