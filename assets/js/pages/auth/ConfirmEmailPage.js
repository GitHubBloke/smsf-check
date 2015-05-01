import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import router from '../../router';
import { connectToStores } from '../../utils/StoreUtils';
import UserActionCreators from '../../actions/UserActionCreators';
import UserStore from '../../stores/UserStore';

class ConfirmEmailPage extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('_handleSubmit');
    this.state = {
      data: Immutable.fromJS({ password: '', passwordConfirmation: '' }),
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.password).focus();
  }

  componentWillUnmount() {
    UserActionCreators.clearResetPasswordError();
  }

  render() {
    const { data } = this.state;
    const { submitting, error } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - Confirm Email Address`}>
        <form onSubmit={this._handleSubmit}>
          {error && <div className='alert alert-danger'>{error.message}</div>}
          <h1 className='append-xs-2'>Welcome to {locals.name}</h1>
          <p>Please select a password for your new account</p>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <div className='form-group text-center col-md-6 col-md-offset-3'>
              <input ref='password'
                type='password' className='form-control input-lg' placeholder='Create your password...'
                value={data.get('password')} onChange={this._handleInputChange.bind(this, 'password')}
                disabled={submitting} />
            </div>
          </div>
          <button className='btn btn-default btn-lg append-xs-1' type='submit' disabled={submitting}>
            {submitting ? 'Please wait...' : 'Log In to your Health Check'}
          </button>
        </form>
      </DocumentTitle>
    );
  }

  _handleSubmit(e) {
    const resetPasswordKey = router.getCurrentParams().resetPasswordKey;
    const password = this.state.data.get('password');

    UserActionCreators.resetPassword(resetPasswordKey, password);

    e.preventDefault();
  }
}

ConfirmEmailPage.propTypes = {
  submitting: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
};

ConfirmEmailPage.defaultProps = { submitting: false, error: void 0 };

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const submitting = UserStore.resetingPassword();
  const error = UserStore.getResetPasswordError();
  return { submitting, error };
}

export default connectToStores(ConfirmEmailPage,
  [ AuthStore, UserStore ],
  pickProps,
  getState
);
