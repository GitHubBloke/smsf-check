import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Col, Button, Input } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM, IntlMixin } from '../../shims/ReactIntl';
import reactMixin from 'react-mixin';
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
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('signin.title'))}`}>
        <form onSubmit={this._handleSubmit}>
          {error && <div className='alert alert-danger'>{error.message}</div>}
          <h1><FM message={this.getIntlMessage('signin.heading')} /></h1>
          <div className='prepend-xs-2 append-xs-1 clearfix'>
            <Col md={6}>
              <Input ref='email' type='email' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.email.placeholder'))}
                value={data.get('email')} onChange={this._handleInputChange.bind(this, 'email', void 0)}
                disabled={submitting} />
            </Col>
            <Col md={6}>
              <Input type='password' bsSize='large'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                value={data.get('password')} onChange={this._handleInputChange.bind(this, 'password', void 0)}
                disabled={submitting} />
            </Col>
          </div>
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
        </form>
      </DocumentTitle>
    );
  }

  _handleSubmit(e) {
    AuthActionCreators.signin(this.state.data.get('email'), this.state.data.get('password'));
    e.preventDefault();
  }
}

reactMixin.onClass(SigninPage, IntlMixin);

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
