import Immutable from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Col, Button, Input } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import { requireUnauth } from '../../utils/AuthUtils';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import Validatable from '../../utils/Validatable';

class SigninPage extends Validatable {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit');
    this.state = {
      data: Immutable.fromJS({ email: '', password: '' }),
    };
  }

  componentWillMount() {
    AuthActionCreators.clearSigninError();
  }

  componentWillUnmount() {
    AuthActionCreators.clearSigninError();
  }

  render() {
    const { data } = this.state;
    const { submitting, error } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('signin.title'))}`}>
        <form onSubmit={this._handleSubmit}>
          {error && <div className='alert alert-danger text-center'>{error.message}</div>}
          <h1 className='text-center'><FM message={this.getIntlMessage('signin.heading')} /></h1>

          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <Col md={6}>
              <Input type='email' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.email.placeholder'))}
                valueLink={this.linkState('email')}
                disabled={submitting}
                {...this.getErrorProps('email')} />
            </Col>
            <Col md={6}>
              <Input type='password' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                valueLink={this.linkState('password')}
                disabled={submitting}
                {...this.getErrorProps('password')} />
            </Col>
          </div>

          <div className='text-center'>
            <Button bsStyle='default' bsSize='large' className='append-xs-1'
              componentClass='button' type='submit'
              disabled={submitting}>
              {submitting ?
                this.formatMessage(this.getIntlMessage('signin.submit.loadingLabel')) :
                this.formatMessage(this.getIntlMessage('signin.submit.actionLabel'))}
            </Button>
            <p className='append-xs-none'>
              <FM message={this.getIntlMessage('signin.needAccount.note')} />{' '}
              <Link to='app'>
                <FM message={this.getIntlMessage('signin.needAccount.actionLabel')} />
              </Link>
            </p>
          </div>
        </form>
      </DocumentTitle>
    );
  }

  _handleSubmit(e) {
    if (this.validate()) {
      AuthActionCreators.signin(this.state.data.get('email'), this.state.data.get('password'));
    }

    e.preventDefault();
  }
}

SigninPage.propTypes = {
  submitting: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
};

SigninPage.defaultProps = { submitting: false, error: void 0 };

SigninPage.schema = {
  email: Joi.string().email().required().label('Email address'),
  password: Joi.string().required().label('Password'),
};

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
