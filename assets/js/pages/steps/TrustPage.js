import Joi from 'joi';
import React from 'react';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BasePage from './BasePage';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

const chartsConfig = {
  trusteeType: require('../../charts/trust/trusteeType'),
  deedSupplier: require('../../charts/trust/deedSupplier'),
};

class TrustPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='members' nextRoute='accounting'>
      </SurveyForm>
    );
  }

  renderForm() {
    return (
      <div>
        <div className='append-xs-2'>{this.renderRadioQuestion('trust.trusteeType', 'survey.trust.trusteeType', true)}</div>
        <div className='append-xs-2'>{this.renderSelectQuestion('trust.deedSupplier', 'survey.trust.deedSupplier')}</div>
        <div className='append-xs-2'>{this.renderSelectQuestion('trust.yearLastUpdated', 'survey.trust.yearLastUpdated', true)}</div>
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
        {this.renderChart(require('../../charts/trust/trusteeType'), options)}
        <hr/>
        {this.renderChart(require('../../charts/trust/deedSupplier'), options)}
      </div>
    );
  }
}

TrustPage.propTypes = {};
TrustPage.defaultProps = {};

TrustPage.schema = {
  survey: {
    trust: {
      trusteeType: Joi.string().required().label('This field'),
      deedSupplier: Joi.string().required().label('This field'),
      yearLastUpdated: Joi.string().required().label('This field'),
    },
  },
};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const survey = SurveyStore.getDirtySurvey();
  const submitting = SurveyStore.isSaving();
  const skippable = SurveyStore.isSkippable();
  return { survey, submitting, skippable };
}

export default wrapSurvey({ requireSkippable: true, confirmDirtySurvey: true }, connectToStores(TrustPage,
  [ SurveyStore ],
  pickProps,
  getState
));
