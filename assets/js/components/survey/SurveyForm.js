import _ from 'lodash';
import Immutable, { Map } from 'immutable';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Row, Well } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import RadioGroup from 'react-radio';
import { Link } from 'react-router';
import Select from 'react-select/lib/Select';

import BaseComponent from '../../utils/BaseComponent';
import ChartsActionCreators from '../../actions/ChartsActionCreators';
import ChartsStore from '../../stores/ChartsStore';
import Icon from '../Icon';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';

export default class SurveyForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit', '_setActiveDataSet', '_setComparisonMember');
  }

  render() {
    const { survey, activeDataSet, comparisonMember } = this.props;

    const memberOptions = survey.get('members').map((member, index) => {
      return {
        label: `${this.formatMessage(this.getIntlMessage('shared.charts.compareTo.prefix'))}${member.get('name')}`,
        value: member.get('ref') || member.get('id'),
      };
    }).toJS();

    memberOptions.unshift({
      label: this.formatMessage(this.getIntlMessage('shared.charts.compareTo.all')),
      value: null,
    });

    const dataSetOptions = [
      { label: this.formatMessage(this.getIntlMessage('shared.charts.activeDataSet.ato')), value: 'ato' },
      { label: this.formatMessage(this.getIntlMessage('shared.charts.activeDataSet.siq'), { name: locals.name }), value: 'siq' },
    ];

    return (
      <form className='survey' noValidate autoComplete='off' onSubmit={this._handleSubmit}>
        <Grid className='prepend-xs-2 append-xs-2'>
          <Row>
            <Col md={8} mdPush={16}>
              <div className='well-group'>

                <Well bsSize='large'>
                  <h4 className='text-bold text-center prepend-xs-none append-xs-1'>
                    <FM message={this.getIntlMessage('shared.charts.title')} />
                  </h4>
                  <div className='append-xs-tiny'>
                    <Select name='comparisonMember' options={memberOptions}
                      placeholder={this.formatMessage(this.getIntlMessage('shared.charts.compareTo.all'))}
                      clearable={false} searchable={false}
                      value={comparisonMember && (comparisonMember.get('ref') || comparisonMember.get('id'))}
                      onChange={this._setComparisonMember} />
                  </div>
                  <Select name='dataSet' options={dataSetOptions}
                    clearable={false} searchable={false}
                    value={activeDataSet}
                    onChange={this._setActiveDataSet} />
                </Well>

                <Well bsSize='large' className='well--white'>
                  {this.props.renderCharts({ activeDataSet, comparisonMember })}
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

  _setActiveDataSet(dataSet) {
    ChartsActionCreators.setActiveDataSet(dataSet);
  }

  _setComparisonMember(id) {
    const member = SurveyStore.getMember(id);
    ChartsActionCreators.setComparisonMember(member);
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
  const activeDataSet = ChartsStore.getActiveDataSet();
  const comparisonMember = ChartsStore.getComparisonMember();

  return { survey, activeDataSet, comparisonMember };
}

export default connectToStores(SurveyForm,
  [ SurveyStore, ChartsStore ],
  pickProps,
  getState
);
