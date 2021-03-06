import Immutable from 'immutable';
import Joi from 'joi';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Input, Row, Well } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM, FormattedHTMLMessage as FHM } from '../../shims/ReactIntl';
import { Link } from 'react-router';

import AuthActionCreators from '../../actions/AuthActionCreators';
import AuthStore from '../../stores/AuthStore';
import locals from '../../utils/locals';
import Password from '../../components/Password';
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

  componentWillUnmount() {
    UserActionCreators.clearResetPasswordError();
  }

  render() {
    const { data } = this.state;
    const { submitting, error } = this.props;

    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('confirmEmail.title'))}`}>
        <Grid className='prepend-xs-1 append-xs-1 prepend-sm-4 append-sm-4'>
          <Row>
            <Col md={18} mdOffset={3}>
              <Well bsSize='large' className='append-xs-none'>
                <form className='append-xs-tiny' autoComplete='off' noValidate onSubmit={this._handleSubmit}>
                  {error && <div className='alert alert-danger text-center'>{error.message}</div>}

                  <div className='text-center prepend-xs-tiny append-xs-2'>
                    <h2 className='prepend-xs-none append-xs-1'>
                      <FM message={this.getIntlMessage('confirmEmail.heading')} name={locals.name} />
                    </h2>
                    <p><FHM message={this.getIntlMessage('confirmEmail.subHeading')} name={locals.name} /></p>
                  </div>

                  <div className='prepend-xs-1 append-xs-1 clearfix'>
                    <Row>
                      <Col md={12} mdOffset={6}>
                        <Password className='input-lg'
                          placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.password.placeholder'))}
                          valueLink={this.linkState('password')}
                          disabled={submitting}
                          {...this.getErrorProps('password')} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} mdOffset={6}>
                        <Input type='password' bsSize='large' className='input-lg'
                          placeholder={this.formatMessage(this.getIntlMessage('shared.fields.user.passwordConfirmation.placeholder'))}
                          valueLink={this.linkState('passwordConfirmation')}
                          disabled={submitting}
                          {...this.getErrorProps('passwordConfirmation')} />
                      </Col>
                    </Row>
                  </div>

                  <div className='text-center'>
                    <Button bsStyle='primary' bsSize='large' className='btn--wide'
                      componentClass='button'
                      type='submit' disabled={submitting}>
                      {submitting ?
                        this.formatMessage(this.getIntlMessage('confirmEmail.submit.loadingLabel')) :
                        this.formatMessage(this.getIntlMessage('confirmEmail.submit.actionLabel'), { name: locals.name })}
                    </Button>
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
    .regex(/^(?=.{8,16})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/g)
    .options({
      language: {
        string: {
          regex: {
            base: 'is required to contain a mix of letters, capital letters, numbers and special characters, and be between 8 to 16 characters long'
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
