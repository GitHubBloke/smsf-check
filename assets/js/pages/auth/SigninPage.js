import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import { requireUnauth } from '../../utils/AuthUtils';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';

class SigninPage extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('_handleSubmit');
    this.state = {
      data: Immutable.fromJS({ email: '', password: '' }),
    };
  }

  componentWillMount() {
    AuthActionCreators.clearSigninError();
  }

  componentDidMount() {
    React.findDOMNode(this.refs.email).focus();
  }

  componentWillUnmount() {
    AuthActionCreators.clearSigninError();
  }

  render() {
    const { data } = this.state;
    const { submitting, error } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - Login`}>
        <form onSubmit={this._handleSubmit}>
          {error && <div className='alert alert-danger'>{error.message}</div>}
          <h1>Log In</h1>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <div className='form-group col-md-6'>
              <input ref='email' type='text' className='form-control input-lg' placeholder='Enter your email...'
                value={data.get('email')} onChange={this._handleInputChange.bind(this, 'email')}
                disabled={submitting} />
            </div>
            <div className='form-group col-md-6'>
              <input type='password' className='form-control input-lg' placeholder='Enter your password...'
                value={data.get('password')} onChange={this._handleInputChange.bind(this, 'password')}
                disabled={submitting} />
            </div>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit' disabled={submitting}>
            {submitting ? 'Please wait...' : 'Log In to your Health Check'}
          </button>
          <p className='append-xs-none'>Need an account? <Link to='app'>Register</Link></p>
        </form>
      </DocumentTitle>
    );
  }

  _handleSubmit(e) {
    AuthActionCreators.signin(this.state.data.get('email'), this.state.data.get('password'));
    e.preventDefault();
  }
}

SigninPage.propTypes = {
  submitting: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
};

SigninPage.defaultProps = { submitting: false, error: void 0 };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const submitting = AuthStore.signingIn();
  const error = AuthStore.getSigninError();
  return { submitting, error };
}

export default requireUnauth(connectToStores(SigninPage,
  [ AuthStore ],
  pickProps,
  getState
));
