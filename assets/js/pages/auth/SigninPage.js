import Immutable from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Col, Button, Grid, Input, Row, Well } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM, FormattedHTMLMessage as FHM } from '../../shims/ReactIntl';
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
        <Grid className='prepend-xs-1 append-xs-1 prepend-sm-4 append-sm-4'>
          <Row>
            <Col md={12} mdOffset={2}>
              <Well bsSize='large' className='append-xs-none'>
                <form className='append-xs-tiny' onSubmit={this._handleSubmit}>
                  {error && <div className='alert alert-danger text-center'>{error.message}</div>}

                  <div className='text-center prepend-xs-tiny append-xs-2'>
                    <h2 className='prepend-xs-none append-xs-1'>
                      <FM message={this.getIntlMessage('signin.heading')} name={locals.name} />
                    </h2>
                    <p><FHM message={this.getIntlMessage('signin.subHeading')} name={locals.name} /></p>
                  </div>

                  <div className='prepend-xs-1 append-xs-1 clearfix'>
                    <Row>
                      <Col md={8} mdOffset={4}>
                        <Input type='email' bsSize='large' className='input-lg'
                          placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.email.placeholder'))}
                          valueLink={this.linkState('email')}
                          disabled={submitting}
                          {...this.getErrorProps('email')} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8} mdOffset={4}>
                        <Input type='password' bsSize='large' className='input-lg'
                          placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                          valueLink={this.linkState('password')}
                          disabled={submitting}
                          {...this.getErrorProps('password')} />
                      </Col>
                    </Row>
                  </div>

                  <div className='text-center'>
                    <Button bsStyle='primary' bsSize='large' className='btn--wide append-xs-1'
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
              </Well>
            </Col>
          </Row>
        </Grid>
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
