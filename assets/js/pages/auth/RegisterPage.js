import Immutable, { Map } from 'Immutable';
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import { requireUnauth } from '../../utils/AuthUtils';
import BaseComponent from '../../utils/BaseComponent';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import UserActionCreators from '../../actions/UserActionCreators';
import UserStore from '../../stores/UserStore';

class RegisterPage extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('_handleSubmit');
    this.state = {
      data: Immutable.fromJS({
        name: { first: '', last: '' },
        email: '',
        fund: { name: '', abn: '' },
        doesConsent: false,
        notifications: { newsletter: false },
      }),
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.firstName).focus();
  }

  componentWillUnmount() {
    UserActionCreators.clearSignup();
  }

  render() {
    const { registeredUser } = this.props;
    return (
      <DocumentTitle title={`${locals.name} - Register`}>
        {registeredUser ? this.renderSuccess() : this.renderForm()}
      </DocumentTitle>
    );
  }

  renderForm() {
    const { data } = this.state;
    const { signingUp, registeredUser, signupError } = this.props;

    return (
      <form onSubmit={this._handleSubmit}>
        {signupError && <div className='alert alert-danger'>{signupError.message}</div>}
        <p>So we can remember who you are, and identify your fund, please enter the details below.</p>
        <div className='prepend-xs-2 append-xs-1 clearfix'>
          <div className='form-group col-md-6'>
            <input ref='firstName' type='text' className='form-control input-lg' placeholder='Enter your first name...'
              value={data.getIn(['name', 'first'])} onChange={this._handleInputChange.bind(this, 'name.first')}
              disabled={signingUp} />
          </div>
          <div className='form-group col-md-6'>
            <input type='text' className='form-control input-lg' placeholder='Enter your last name...'
              value={data.getIn(['name', 'last'])} onChange={this._handleInputChange.bind(this, 'name.last')}
              disabled={signingUp} />
          </div>
          <div className='form-group col-md-12'>
            <input type='email' className='form-control input-lg' placeholder='Enter your email address...'
              value={data.get('email')} onChange={this._handleInputChange.bind(this, 'email')}
              disabled={signingUp} />
          </div>
          <div className='form-group col-md-12'>
            <input type='text' className='form-control input-lg' placeholder='The name of your fund...'
              value={data.getIn(['fund', 'name'])} onChange={this._handleInputChange.bind(this, 'fund.name')}
              disabled={signingUp} />
          </div>
          <div className='form-group col-md-12'>
            <input type='text' className='form-control input-lg' placeholder="Your fund's ABN..."
              value={data.getIn(['fund', 'abn'])} onChange={this._handleInputChange.bind(this, 'fund.abn')}
              disabled={signingUp} />
          </div>
          <div className='form-group col-md-12 prepend-xs-tiny append-xs-tiny text-left'>
            <label>
              <input type='checkbox'
                checked={data.get('doesConsent')} onChange={this._handleCheckboxToggled.bind(this, 'doesConsent')}
                disabled={signingUp} />
              &nbsp;
              I consent to {locals.brand} using my data to compare my fund to other funds.
            </label>
            <label>
              <input type='checkbox'
                checked={data.getIn(['notifications', 'newsletter'])}
                onChange={this._handleCheckboxToggled.bind(this, 'notifications.newsletter')}
                disabled={signingUp} />
              &nbsp;
              I would like to receive additional information from {locals.brand} via email.
            </label>
          </div>
        </div>
        <button className='btn btn-default btn-lg append-xs-1' type='submit' disabled={signingUp || !data.get('doesConsent')}>
          {signingUp ? 'Please wait...' : 'Register now'}
        </button>
        <p className='append-xs-none'>Already registered? <Link to='signin'>Log In</Link></p>
      </form>
    );
  }

  renderSuccess() {
    return (
      <p className='append-xs-none'>Thankyou for signing up. We've sent you an email with instructions on how to log in.</p>
    );
  }

  _handleSubmit(e) {
    UserActionCreators.signup(this.state.data.toJS());
    e.preventDefault();
  }
}

RegisterPage.propTypes = {
  signingUp: PropTypes.bool,
  registeredUser: PropTypes.instanceOf(Map),
  signupError: PropTypes.shape({
    message: PropTypes.string,
    errors: PropTypes.object,
  }),
};

RegisterPage.defaultProps = {
  signingUp: false,
  registeredUser: void 0,
  signupError: void 0
};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const signingUp = UserStore.signingUp();
  const registeredUser = UserStore.getRegisteredUser();
  const signupError = UserStore.getSignupError();
  return { signingUp, registeredUser, signupError };
}

export default requireUnauth(connectToStores(RegisterPage,
  [ UserStore ],
  pickProps,
  getState
));

