import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Col, Button, Input } from 'react-bootstrap';
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
    this.refs.email.getInputDOMNode().focus();
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
            <Col md={6}>
              <Input ref='email' type='email' placeholder='Enter your email...' bsSize='large'
                value={data.get('email')} onChange={this._handleInputChange.bind(this, 'email')}
                disabled={submitting} />
            </Col>
            <Col md={6}>
              <Input type='password' placeholder='Enter your password...' bsSize='large'
                value={data.get('password')} onChange={this._handleInputChange.bind(this, 'password')}
                disabled={submitting} />
            </Col>
          </div>
          <Button bsStyle='default' bsSize='large' className='append-xs-1'
            componentClass='button' type='submit'
            disabled={submitting}>
            {submitting ? 'Please wait...' : 'Log In to your Health Check'}
          </Button>
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
