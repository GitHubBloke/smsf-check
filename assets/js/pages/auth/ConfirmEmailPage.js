import Immutable from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Button, Col, Input } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import locals from '../../utils/locals';
import router from '../../router';
import { connectToStores } from '../../utils/StoreUtils';
import UserActionCreators from '../../actions/UserActionCreators';
import UserStore from '../../stores/UserStore';
import Validatable from '../../utils/Validatable';

class ConfirmEmailPage extends Validatable {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit');
    this.state = {
      data: Immutable.fromJS({ password: '', passwordConfirmation: '' }),
    };
  }

  componentWillMount() {
    UserActionCreators.clearResetPasswordError();
  }

  componentDidMount() {
    this.refs.password.getInputDOMNode().focus();
  }

  componentWillUnmount() {
    UserActionCreators.clearResetPasswordError();
  }

  render() {
    const { data } = this.state;
    const { submitting, error } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('confirmEmail.title'))}`}>
        <form autoComplete='off' noValidate onSubmit={this._handleSubmit}>
          {error && <div className='alert alert-danger text-center'>{error.message}</div>}

          <div className='text-center'>
            <h1 className='append-xs-2'>
              <FM message={this.getIntlMessage('confirmEmail.heading')} name={locals.name} />
            </h1>
            <p>
              <FM message={this.getIntlMessage('confirmEmail.subHeading')} />
            </p>
          </div>

          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <Col md={6}>
              <Input ref='password' type='password' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                valueLink={this.linkState('password')}
                disabled={submitting}
                {...this.getErrorProps('password')} />
            </Col>
            <Col md={6}>
              <Input type='password' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.passwordConfirmation.placeholder'))}
                valueLink={this.linkState('passwordConfirmation')}
                disabled={submitting}
                {...this.getErrorProps('passwordConfirmation')} />
            </Col>
          </div>

          <div className='text-center'>
            <Button bsStyle='default' bsSize='large' className='append-xs-1'
              componentClass='button'
              type='submit' disabled={submitting}>
              {submitting ?
                this.formatMessage(this.getIntlMessage('confirmEmail.submit.loadingLabel')) :
                this.formatMessage(this.getIntlMessage('confirmEmail.submit.actionLabel'))}
            </Button>
          </div>
        </form>
      </DocumentTitle>
    );
  }

  _handleSubmit(e) {
    if (this.validate()) {
      const resetPasswordKey = router.getCurrentParams().resetPasswordKey;
      const password = this.state.data.get('password');

      UserActionCreators.resetPassword(resetPasswordKey, password);
    }

    e.preventDefault();
  }
}

ConfirmEmailPage.propTypes = {
  submitting: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
};

ConfirmEmailPage.defaultProps = { submitting: false, error: void 0 };

ConfirmEmailPage.schema = {
  password: Joi.string()
    .min(8).max(16)
    .regex(/^(?=.{0,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/g)
    .options({
      language: {
        string: {
          regex: {
            base: 'is required to contain a mix of letters, capital letters, numbers and special characters'
          }
        }
      }
    })
    .required()
    .label('Password'),

  passwordConfirmation: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'does not match' } } })
    .label('Password confirmation'),
};

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
