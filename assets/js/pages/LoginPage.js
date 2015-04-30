import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import AuthActionCreators from '../actions/AuthActionCreators';
import AuthStore from '../stores/AuthStore';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import { connectToStores } from '../utils/StoreUtils';

class LoginPage extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('_signin');
    this.state = { email: '', password: '' };
  }

  render() {
    const { email, password } = this.state;
    const { loggingIn } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - Login`}>
        <form onSubmit={this._signin}>
          <h1>Log In</h1>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <div className='form-group col-md-6'>
              <input type='text' className='form-control input-lg' placeholder='Enter your email...'
                value={email} onChange={this._handleInputChange.bind(this, 'email')}
                disabled={loggingIn} />
            </div>
            <div className='form-group col-md-6'>
              <input type='password' className='form-control input-lg' placeholder='Enter your password...'
                value={password} onChange={this._handleInputChange.bind(this, 'password')}
                disabled={loggingIn} />
            </div>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit' disabled={loggingIn}>
            {loggingIn ? 'Please wait...' : 'Log In to your Health Check'}
          </button>
          <p className='append-xs-none'>Need an account? <Link to='app'>Register</Link></p>
        </form>
      </DocumentTitle>
    );
  }

  _handleInputChange(name, e) {
    this.setState({ [name]: e.target.value });
  }

  _signin(e) {
    AuthActionCreators.signin(this.state.email, this.state.password);
    e.preventDefault();
  }
}

LoginPage.propTypes = { loggingIn: PropTypes.bool };
LoginPage.defaultProps = { loggingIn: false };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const loggingIn = AuthStore.loggingIn();
  return { loggingIn };
}

export default connectToStores(LoginPage,
  [ AuthStore ],
  pickProps,
  getState
);
