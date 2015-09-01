import Joi from 'joi';
import React from 'react';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import BasePage from './BasePage';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class AccountingPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='trust' nextRoute='investment-advice'>
      </SurveyForm>
    );
  }

  renderForm() {
    const { data } = this.state;

    return (
      <div>
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('accounting.whoDoesIt')} />
        </div>
        {(data.getIn([ 'survey', 'accounting', 'whoDoesIt' ]) !== 'myself') && <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('accounting.costPerYear')} />
        </div>}
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
        {this.renderChart(require('../../charts/accounting/fees'), options)}
      </div>
    );
  }
}

AccountingPage.propTypes = {};
AccountingPage.defaultProps = {};

AccountingPage.schema = {
  survey: {
    accounting: {
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

export default wrapSurvey({ requireSkippable: true, confirmDirtySurvey: true }, connectToStores(AccountingPage,
  [ SurveyStore ],
  pickProps,
  getState
));
