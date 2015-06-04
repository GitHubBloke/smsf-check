import _ from 'lodash';
import Immutable, { Map } from 'immutable';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Row, Well } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';
import { Link } from 'react-router';
import Select from 'react-select/lib/Select';

import BaseComponent from '../utils/BaseComponent';
import Icon from './Icon';
import { connectToStores } from '../utils/StoreUtils';
import SurveyActionCreators from '../actions/SurveyActionCreators';
import SurveyStore from '../stores/SurveyStore';

export default class SurveyForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit');
    this.state = { data: Immutable.fromJS({ dataSet: 'ato', compareType: 'all', compareMember: void 0 }) };
  }

  render() {
    const { survey } = this.props;
    const { data } = this.state;

    const memberOptions = survey.get('members').map((member, index) => ({
      label: member.get('name'),
      value: member.get('dateOfBirth'),
    })).toJS();

    return (
      <form className='survey' noValidate autoComplete='off' onSubmit={this._handleSubmit}>
        <Grid className='prepend-xs-2 append-xs-2'>
          <Row>
            <Col md={8} mdPush={16}>
              <div className='well-group'>

                <Well bsSize='large'>
                  <h3 className='text-bold text-center prepend-xs-none append-xs-1'>Compare Members & Funds</h3>
                  <Row>
                    <Col xs={22} xsOffset={1}>
                      <RadioGroup className='clearfix' name='compareType' {...this.valueLink('compareType')}>
                        <div className='radio prepend-xs-tiny'>
                          <label className='text-normal'>
                            <input type='radio' value='all' />&nbsp; Compare to all members and funds
                          </label>
                        </div>
                        <div className='radio'>
                          <label className='text-normal'>
                            <input type='radio' value='similar' />&nbsp; Compare to members like:
                          </label>
                        </div>
                      </RadioGroup>
                      <Select name='compareMember' options={memberOptions}
                        clearable={false}
                        {...this.valueLink('compareMember', () => this._setState('compareType', 'similar'))} />
                    </Col>
                  </Row>
                </Well>

                <Well bsSize='large'>
                  <Row>
                    <Col xs={22} xsOffset={1}>
                      <RadioGroup name='dataSet' {...this.valueLink('dataSet')}>
                        <div className='radio prepend-xs-none'>
                          <label className='text-normal'>
                            <input type='radio' value='ato' />&nbsp; Display ATO SMSF data set
                          </label>
                        </div>
                        <div className='radio append-xs-none'>
                          <label className='text-normal'>
                            <input type='radio' value='siq' />&nbsp; Display IQ Compare data set
                          </label>
                        </div>
                      </RadioGroup>
                    </Col>
                  </Row>
                </Well>

                <Well bsSize='large' className='well--white'>
                  {this.props.renderCharts(data.toJS())}
                </Well>

              </div>
            </Col>

            <Col md={16} mdPull={8} className='prepend-xs-1'>
              {this.props.renderForm()}
              <hr className='prepend-xs-tiny append-xs-tiny' />
              {this.renderActions()}
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }

  renderActions() {
    const { skippable, submitting, prevRoute, nextRoute } = this.props;

    return (
      <ul className='list-inline pull-right prepend-xs-1'>
        {skippable && nextRoute &&
          <li>
            <Link className='btn btn-link btn-lg link-plain' to={nextRoute}>
              <small><FM message={this.getIntlMessage('shared.actions.skipStep.actionLabel')} /></small>
            </Link>
          </li>}

        {prevRoute &&
          <li>
            <Link to={prevRoute} className='btn btn-primary btn-lg'
              disabled={submitting}>
              <Icon id='android-arrow-back' size='lg' />
              &nbsp;&nbsp;
              <FM message={this.getIntlMessage('shared.actions.prevStep.actionLabel')} />
            </Link>
          </li>}

        {nextRoute &&
          <li>
            <Button bsSize='large' bsStyle='primary' type='submit'
              disabled={submitting}>
              <FM message={this.getIntlMessage(`shared.actions.nextStep.${submitting ? 'loadingLabel' : 'actionLabel'}`)} />
              &nbsp;&nbsp;
              <Icon id='android-arrow-forward' size='lg' />
            </Button>
          </li>}
      </ul>
    );
  }

  _handleSubmit(e) {
    const { nextRoute } = this.props;

    SurveyActionCreators.saveAndTransitionTo(nextRoute);
    e.preventDefault();
  }
}

SurveyForm.propTypes = {
  survey: PropTypes.instanceOf(Map),
  submitting: PropTypes.bool.isRequired,
  skippable: PropTypes.bool.isRequired,
  prevRoute: PropTypes.string,
  nextRoute: PropTypes.string,
};

SurveyForm.defaultProps = {};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const survey = SurveyStore.getDirtySurvey();
  return { survey };
}

export default connectToStores(SurveyForm,
  [ SurveyStore ],
  pickProps,
  getState
);
