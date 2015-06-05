import Immutable from 'immutable';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import AdviceBubble from '../../components/AdviceBubble';
import BasePage from './BasePage';
import locals from '../../utils/locals';
import RadioQuestion from '../../components/RadioQuestion';
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
        {this.renderWhoDoesAccounting()}
        {this.renderAccountingCostPerYear()}
      </div>
    );
  }

  renderCharts() {
    return <div></div>;
  }

  renderWhoDoesAccounting() {
    const { data } = this.state;
    const { submitting } = this.props;

    const radioData = {
      question: this.formatMessage(this.getIntlMessage('investmentAdvice.whoDoesIt.question')),
      options: this.translatedOptions('investmentAdvice.whoDoesIt.options'),
      valueLink: this.valueLink('survey.investmentAdvice.whoDoesIt'),
      disabled: submitting,
      error: this.getErrorProps('survey.investmentAdvice.whoDoesIt').help,
    };

    return (
      <Row className='append-xs-2'>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
          {data.getIn([ 'survey', 'investmentAdvice', 'whoDoesIt' ]) &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage('investmentAdvice.whoDoesIt.advice'))} />}
        </Col>
      </Row>
    );
  }

  renderAccountingCostPerYear() {
    const { data } = this.state;
    const { submitting } = this.props;
    const costPerYear = data.getIn([ 'survey', 'investmentAdvice', 'costPerYear' ]);

    const radioData = {
      question: this.formatMessage(this.getIntlMessage('investmentAdvice.costPerYear.question')),
      options: this.translatedOptions('investmentAdvice.costPerYear.options'),
      valueLink: this.valueLink('survey.investmentAdvice.costPerYear'),
      disabled: submitting,
      error: this.getErrorProps('survey.investmentAdvice.costPerYear').help,
    };

    return (
      <Row className='append-xs-2'>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
          {costPerYear &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage('investmentAdvice.costPerYear.advice'))} />}
        </Col>
      </Row>
    );
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
