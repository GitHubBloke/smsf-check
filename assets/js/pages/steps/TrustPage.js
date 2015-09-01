import Joi from 'joi';
import React from 'react';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import BasePage from './BasePage';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

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
    const { submitting } = this.props;

    return (
      <div>
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('trust.trusteeType')} />
        </div>
        <div className='append-xs-2'>
          <SelectQuestion {...this.questionProps('trust.deedSupplier')} />
        </div>
        <div className='append-xs-2'>
          <SelectQuestion {...this.questionProps('trust.yearLastUpdated')} />
        </div>
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
        {this.renderChart(require('../../charts/trust/type'), options)}
        {this.renderChart(require('../../charts/trust/deed-supplier'), options)}
        {this.renderChart(require('../../charts/trust/deed-age'), options)}
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
