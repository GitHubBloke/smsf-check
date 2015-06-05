import Joi from 'joi';
import React from 'react';

import BasePage from './BasePage';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class InvestmentAdvicePage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='accounting' nextRoute='investment-strategy'>
      </SurveyForm>
    );
  }

  renderForm() {
    return (
      <div>
        <div className='append-xs-2'>{this.renderRadioQuestion('investmentAdvice.whoDoesIt', 'survey.investmentAdvice.whoDoesIt', true)}</div>
        <div className='append-xs-2'>{this.renderRadioQuestion('investmentAdvice.costPerYear', 'survey.investmentAdvice.costPerYear', true)}</div>
      </div>
    );
  }

  renderCharts() {
    return <div></div>;
  }
}

InvestmentAdvicePage.propTypes = {};
InvestmentAdvicePage.defaultProps = {};

InvestmentAdvicePage.schema = {
  survey: {
    investmentAdvice: {
      whoDoesIt: Joi.string().required().label('This field'),
      costPerYear: Joi.string().required().label('This field'),
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

export default wrapSurvey({ requireSkippable: true, confirmDirtySurvey: true }, connectToStores(InvestmentAdvicePage,
  [ SurveyStore ],
  pickProps,
  getState
));
