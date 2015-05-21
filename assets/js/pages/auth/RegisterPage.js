import _ from 'lodash';
import classNames from 'classnames';
import Immutable, { Map } from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Input, Row, Well } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM, FormattedHTMLMessage as FHM } from '../../shims/ReactIntl';
import { Link } from 'react-router';
import Select from 'react-select';

import { requireUnauth } from '../../utils/AuthUtils';
import abnLoader from '../../api/abnLoader';
import Icon, { IconStack } from '../../components/Icon';
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
      }),
    };
  }

  componentWillMount() {
    UserActionCreators.clearSignup();
  }

  componentWillUnmount() {
    UserActionCreators.clearSignup();
  }

  render() {
    const { registeredUser } = this.props;
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('register.title'))}`}>
        <div>
          {this.renderHero()}

          <Grid>
            {this.renderFeatures()}

            <Row>
              <Col md={18} mdOffset={3} className='append-xs-2'>
                <Well bsSize='large'>
                  {registeredUser ? this.renderSuccess() : this.renderForm()}
                </Well>
              </Col>
            </Row>
          </Grid>
        </div>
      </DocumentTitle>
    );
  }

  renderHero() {
    return (
      <div className='hero text-inverse'>
        <Grid>
          <Row className='text-center clearfix'>
            <Col md={16} mdOffset={4} className='prepend-xs-2 append-xs-2 prepend-md-5 append-md-5'>
              <h1 className='prepend-xs-tiny'>{locals.name}</h1>
              <h3 className='text-normal'>
                <FM message={this.getIntlMessage('home.hero.intro')}
                  name={locals.name}
                  brand={locals.brand} />
              </h3>
              <div className='prepend-xs-1'>
                <Button className='btn-clear btn--wide' bsSize='large' href='/#register'>
                  <FM message={this.getIntlMessage('home.hero.signup.actionLabel')} />
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  renderFeatures() {
    return (
      <Row className='text-center prepend-xs-2 prepend-sm-3'>
        <Col md={6} mdOffset={3} className='append-xs-2 append-sm-3'>
          <IconStack size='3x'>
            <Icon id='record' size='2x' stacked className='text-primary' />
            <Icon id='android-lock' size='1x' stacked className='text-inverse' />
          </IconStack>
          <div className='prepend-xs-1'>
            <FM message={this.getIntlMessage('home.features.safeData')} />
          </div>
        </Col>
        <Col md={6} className='append-xs-2 append-sm-3'>
          <IconStack size='3x'>
            <Icon id='record' size='2x' stacked className='text-primary' />
            <Icon id='information' size='1x' stacked className='text-inverse' />
          </IconStack>
          <div className='prepend-xs-1'>
            <FM message={this.getIntlMessage('home.features.greatAdvice')} />
          </div>
        </Col>
        <Col md={6} className='append-xs-2 append-sm-3'>
          <IconStack size='3x'>
            <Icon id='record' size='2x' stacked className='text-primary' />
            <Icon id='stats-bars' size='1x' stacked className='text-inverse' />
          </IconStack>
          <div className='prepend-xs-1'>
            <FM message={this.getIntlMessage('home.features.compare')} name={locals.name} />
          </div>
        </Col>
      </Row>
    );
  }

  renderForm() {
    const { data } = this.state;
    const { submitting, registeredUser, error } = this.props;

    return (
      <form id='register' className='append-xs-tiny' autoComplete='off' noValidate onSubmit={this._handleSubmit}>
        {error && <div className='alert alert-danger text-center'>{error.message}</div>}

        <p className='prepend-xs-tiny text-center'>
          <FHM message={this.getIntlMessage('register.intro')} />
        </p>
        <hr/>

        <div className='prepend-xs-1 append-xs-1 clearfix'>
          <Row>
            <Col md={12}>
              <Input type='text' bsSize='large' className='input-lg'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.firstName.placeholder'))}
                valueLink={this.linkState('name.first')}
                disabled={submitting}
                {...this.getErrorProps('name.first')} />
            </Col>
            <Col md={12}>
              <Input type='text' bsSize='large' className='input-lg'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.lastName.placeholder'))}
                valueLink={this.linkState('name.last')}
                disabled={submitting}
                {...this.getErrorProps('name.last')} />
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Input type='email' bsSize='large' className='input-lg'
                placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.email.placeholder'))}
                valueLink={this.linkState('email')}
                disabled={submitting}
                {...this.getErrorProps('email')} />
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <div className={classNames({ 'form-group': true, 'has-error': this.hasError('fund.abn') })}>
                <Select name='fundAbn' asyncOptions={abnLoader('abn')} autoload={false} className='Select--lg'
                  placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.fundAbn.placeholder'))}
                  {...this.valueLink('fund.abn', this._handleFundSelect)}
                  disabled={submitting} />
                  {this.hasError('fund.abn') &&
                    <span className='help-block'
                      dangerouslySetInnerHTML={{ __html: this.getErrorProps('fund.abn').help }}></span>}
              </div>
            </Col>
          </Row>
          <hr className='prepend-xs-tiny append-xs-tiny' />
          <Row>
            <Col md={24} className='append-xs-tiny text-left'>
              <Input type='checkbox'
                label={this.formatMessage(this.getIntlMessage('shared.fields.user.doesConsent.label'), { brand: locals.brand })}
                checkedLink={this.linkState('doesConsent')}
                disabled={submitting} />
            </Col>
          </Row>
        </div>

        <div className='text-center'>
          <Button bsStyle='primary' bsSize='large' className='btn--wide append-xs-1'
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
      <p className='text-center append-xs-none'>
        <FM message={this.getIntlMessage('register.successful')} />
      </p>
    );
  }

  _handleFundSelect(value, selectedOptions) {
    const { abn } = selectedOptions[0] || {};
    if (abn) {
      this._setState('fund.name', abn.name);
      this._setState('fund.abn', abn.abn);
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
    abn: Joi.string()
      .required()
      .options({
        language: {
          any: {
            required: 'and then select from the list',
            empty: 'and then select from the list',
          }
        }
      })
      .label('Enter your fund\'s ABN'),
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

