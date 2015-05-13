import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Button, Col, Input } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
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
          {error && <div className='alert alert-danger'>{error.message}</div>}

          <h1 className='append-xs-2'>
            <FM message={this.getIntlMessage('confirmEmail.heading')} name={locals.name} />
          </h1>
          <p>
            <FM message={this.getIntlMessage('confirmEmail.subHeading')} />
          </p>

          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <Col md={6} mdOffset={3}>
              <Input ref='password' type='password' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                valueLink={this.linkState('password')}
                disabled={submitting} />
            </Col>
          </div>

          <Button bsStyle='default' bsSize='large' className='append-xs-1'
            componentClass='button'
            type='submit' disabled={submitting}>
            {submitting ?
              this.formatMessage(this.getIntlMessage('confirmEmail.submit.loadingLabel')) :
              this.formatMessage(this.getIntlMessage('confirmEmail.submit.actionLabel'))}
          </Button>
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
