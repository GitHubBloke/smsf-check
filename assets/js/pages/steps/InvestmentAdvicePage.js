import Immutable from 'immutable';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BasePage from './BasePage';
import locals from '../../utils/locals';
import RadioQuestion from '../../components/RadioQuestion';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from './SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { requireSkippable } from '../../utils/SurveyUtils';

class InvestmentAdvicePage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderChart');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderChart={this.renderChart}
        prevRoute='accounting' nextRoute='results'>
      </SurveyForm>
    );
  }

  renderForm() {
    return (
      <div>
        {this.renderWhoDoesAccounting()}
        {this.renderAccountingCostPerYear()}
      </div>
    );
  }

  renderChart() {
    return <div></div>;
  }

  renderWhoDoesAccounting() {
    const { data } = this.state;
    const { submitting } = this.props;

    const radioData = {
      question: this.getIntlMessage('investmentAdvice.whoDoesInvestmentAdvice.question'),
      options: this.translatedOptions('investmentAdvice.whoDoesInvestmentAdvice.options'),
      valueLink: this.valueLink('survey.whoDoesInvestmentAdvice'),
      disabled: submitting,
      error: this.getErrorProps('survey.whoDoesInvestmentAdvice').help,
    };

    return (
      <Row>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
        </Col>
      </Row>
    );
  }

  renderAccountingCostPerYear() {
    const { data } = this.state;
    const { submitting } = this.props;

    const radioData = {
      question: this.getIntlMessage('investmentAdvice.investmentAdviceCostPerYear.question'),
      options: this.translatedOptions('investmentAdvice.investmentAdviceCostPerYear.options'),
      valueLink: this.valueLink('survey.investmentAdviceCostPerYear'),
      disabled: submitting,
      error: this.getErrorProps('survey.investmentAdviceCostPerYear').help,
    };

    return (
      <Row>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
        </Col>
      </Row>
    );
  }
}

InvestmentAdvicePage.propTypes = {};
InvestmentAdvicePage.defaultProps = {};

InvestmentAdvicePage.schema = {
  survey: {
    whoDoesInvestmentAdvice: Joi.string().required().label('This field'),
    investmentAdviceCostPerYear: Joi.string().required().label('This field'),
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

export default requireSkippable(connectToStores(InvestmentAdvicePage,
  [ SurveyStore ],
  pickProps,
  getState
));
