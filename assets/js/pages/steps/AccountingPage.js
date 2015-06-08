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
    return (
      <div>
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('accounting.whoDoesIt')} />
        </div>
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('accounting.costPerYear')} />
        </div>
      </div>
    );
  }

  renderCharts() {
    return <div></div>;
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
