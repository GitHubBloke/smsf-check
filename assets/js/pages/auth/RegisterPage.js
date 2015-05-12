import Immutable, { Map } from 'immutable';
import React, { PropTypes } from 'react';
import { Col, Button, Input } from 'react-bootstrap';
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

  componentWillMount() {
    UserActionCreators.clearSignup();
  }

  componentDidMount() {
    this.refs.firstName.getInputDOMNode().focus();
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
    const { submitting, registeredUser, error } = this.props;

    return (
      <form autoComplete='off' noValidate onSubmit={this._handleSubmit}>
        {error && <div className='alert alert-danger'>{error.message}</div>}
        <p>
          So we can remember who you are, and identify your fund, please enter the details below.<br/>
          Your information will never be used for any purposes outside of this helpful tool.
        </p>
        <div className='prepend-xs-2 append-xs-1 clearfix'>
          <Col md={6}>
            <Input ref='firstName' type='text' placeholder='Enter your first name...' bsSize='large'
              value={data.getIn(['name', 'first'])} onChange={this._handleInputChange.bind(this, 'name.first')}
              disabled={submitting} />
          </Col>
          <Col md={6}>
            <Input type='text' placeholder='Enter your last name...' bsSize='large'
              value={data.getIn(['name', 'last'])} onChange={this._handleInputChange.bind(this, 'name.last')}
              disabled={submitting} />
          </Col>
          <Col md={12}>
            <Input type='email' placeholder='Enter your email address...' bsSize='large'
              value={data.get('email')} onChange={this._handleInputChange.bind(this, 'email')}
              disabled={submitting} />
          </Col>
          <Col md={12}>
            <Input type='text' placeholder='The name of your fund...' bsSize='large'
              value={data.getIn(['fund', 'name'])} onChange={this._handleInputChange.bind(this, 'fund.name')}
              disabled={submitting} />
          </Col>
          <Col md={12}>
            <Input type='text' placeholder="Your fund's ABN..." bsSize='large'
              value={data.getIn(['fund', 'abn'])} onChange={this._handleInputChange.bind(this, 'fund.abn')}
              disabled={submitting} />
          </Col>
          <Col md={12} className='append-xs-tiny text-left'>
            <Input type='checkbox'
              label={`I consent to ${locals.brand} using my data to compare my fund to other funds.`}
              checked={data.get('doesConsent')} onChange={this._handleCheckboxToggled.bind(this, 'doesConsent')}
              disabled={submitting} />
            <Input type='checkbox'
              label={`I would like to receive additional information from ${locals.brand} via email.`}
              checked={data.getIn(['notifications', 'newsletter'])}
              onChange={this._handleCheckboxToggled.bind(this, 'notifications.newsletter')}
              disabled={submitting} />
          </Col>
        </div>
        <Button bsStyle='default' bsSize='large' className='append-xs-1'
          componentClass='button' type='submit'
          disabled={submitting || !data.get('doesConsent')}>
          {submitting ? 'Please wait...' : 'Register'}
        </Button>
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
  submitting: PropTypes.bool,
  registeredUser: PropTypes.instanceOf(Map),
  error: PropTypes.shape({
    message: PropTypes.string,
    errors: PropTypes.object,
  }),
};

RegisterPage.defaultProps = {
  submitting: false,
  registeredUser: void 0,
  error: void 0
};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const submitting = UserStore.signingUp();
  const registeredUser = UserStore.getRegisteredUser();
  const error = UserStore.getSignupError();
  return { submitting, registeredUser, error };
}

export default requireUnauth(connectToStores(RegisterPage,
  [ UserStore ],
  pickProps,
  getState
));

