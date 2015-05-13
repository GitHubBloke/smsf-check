import _ from 'lodash';
import classNames from 'classnames';
import Immutable, { Map } from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Button, Col, Input } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import { Link } from 'react-router';
import Select from 'react-select';

import { requireUnauth } from '../../utils/AuthUtils';
import fundLoader from '../../api/fundLoader';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import UserActionCreators from '../../actions/UserActionCreators';
import UserStore from '../../stores/UserStore';
import Validatable from '../../utils/Validatable';

class RegisterPage extends Validatable {
  constructor(props) {
    super(props);
    this.bind('_handleFundSelect', '_handleSubmit');
    this.state = {
      data: Immutable.fromJS({
        name: { first: '', last: '' },
        email: '',
        fund: { name: void 0, abn: void 0 },
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
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('register.title'))}`}>
        {registeredUser ? this.renderSuccess() : this.renderForm()}
      </DocumentTitle>
    );
  }

  renderForm() {
    const { data } = this.state;
    const { submitting, registeredUser, error } = this.props;

    return (
      <form autoComplete='off' noValidate onSubmit={this._handleSubmit}>
        {error && <div className='alert alert-danger text-center'>{error.message}</div>}
        <p className='text-center'><FM message={this.getIntlMessage('register.intro')} /></p>

        <div className='prepend-xs-2 append-xs-1 clearfix'>
          <Col md={6}>
            <Input ref='firstName' type='text' bsSize='large'
              placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.firstName.placeholder'))}
              valueLink={this.linkState('name.first')}
              disabled={submitting}
              {...this.getErrorProps('name.first')} />
          </Col>
          <Col md={6}>
            <Input type='text' bsSize='large'
              placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.lastName.placeholder'))}
              valueLink={this.linkState('name.last')}
              disabled={submitting}
              {...this.getErrorProps('name.last')} />
          </Col>
          <Col md={12}>
            <Input type='email' bsSize='large'
              placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.email.placeholder'))}
              valueLink={this.linkState('email')}
              disabled={submitting}
              {...this.getErrorProps('email')} />
          </Col>
          <Col md={12}>
            <div className={classNames({ 'form-group': true, 'has-error': this.hasError('fund.name') })}>
              <Select name='fundName' asyncOptions={fundLoader('name')} autoload={false}
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.fundName.placeholder'))}
                {...this.valueLink('fund.name', this._handleFundSelect)}
                disabled={submitting} />
              <span className='help-block'>{this.getErrorProps('fund.name').help}</span>
            </div>
          </Col>
          <Col md={12}>
            <div className={classNames({ 'form-group': true, 'has-error': this.hasError('fund.abn') })}>
              <Select name='fundAbn' asyncOptions={fundLoader('abn')} autoload={false}
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.fundAbn.placeholder'))}
                {...this.valueLink('fund.abn', this._handleFundSelect)}
                disabled={submitting} />
              <span className='help-block'>{this.getErrorProps('fund.abn').help}</span>
            </div>
          </Col>
          <Col md={12} className='append-xs-tiny text-left'>
            <Input type='checkbox'
              label={this.formatMessage(this.getIntlMessage('shared.fields.user.doesConsent.label'), { brand: locals.brand })}
              checkedLink={this.linkState('doesConsent')}
              disabled={submitting} />
            <Input type='checkbox'
              label={this.formatMessage(this.getIntlMessage('shared.fields.user.notifications.label'), { brand: locals.brand })}
              checkedLink={this.linkState('notifications.newsletter')}
              disabled={submitting} />
          </Col>
        </div>

        <div className='text-center'>
          <Button bsStyle='default' bsSize='large' className='append-xs-1'
            componentClass='button' type='submit'
            disabled={submitting || !data.get('doesConsent')}>
            {submitting ?
              this.formatMessage(this.getIntlMessage('register.submit.loadingLabel')) :
              this.formatMessage(this.getIntlMessage('register.submit.actionLabel'))}
          </Button>
          <p className='append-xs-none'>
            <FM message={this.getIntlMessage('register.already.note')} />{' '}
            <Link to='signin'>
              <FM message={this.getIntlMessage('register.already.actionLabel')} />
            </Link>
          </p>
        </div>
      </form>
    );
  }

  renderSuccess() {
    return (
      <p className='append-xs-none'>
        <FM message={this.getIntlMessage('register.sucessful')} />
      </p>
    );
  }

  _handleFundSelect(value, selectedOptions) {
    const { fund } = selectedOptions[0] || {};
    if (fund) {
      this._setState('fund.name', fund.name);
      this._setState('fund.abn', fund.abn);
    }
  }

  _handleSubmit(e) {
    if (this.validate()) {
      UserActionCreators.signup(this.state.data.toJS());
    }

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

RegisterPage.schema = {
  name: {
    first: Joi.string().required().label('First name'),
    last: Joi.string().required().label('Last name'),
  },
  email: Joi.string().email().required().label('Email address'),
  fund: {
    name: Joi.string()
      .required()
      .options({ language: { any: { required: 'must be selected from the list of funds' } } })
      .label('Fund name'),
    abn: Joi.string()
      .required()
      .options({ language: { any: { required: 'must be selected from the list of funds' } } })
      .label('Fund ABN'),
  },
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

