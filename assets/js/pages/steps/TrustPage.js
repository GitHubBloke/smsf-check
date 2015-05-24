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
import SelectQuestion from '../../components/SelectQuestion';
import SurveyForm from '../../components/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class TrustPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderChart');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderChart={this.renderChart}
        prevRoute='members' nextRoute='accounting'>
      </SurveyForm>
    );
  }

  renderForm() {
    return (
      <div>
        {this.renderTrusteeType()}
        {this.renderDeedSupplier()}
        {this.renderYearLastUpdated()}
      </div>
    );
  }

  renderChart() {
    return <div></div>;
  }

  renderTrusteeType() {
    const { data } = this.state;
    const { submitting } = this.props;

    const radioData = {
      question: this.formatMessage(this.getIntlMessage('trust.trusteeType.question')),
      options: this.translatedOptions('trust.trusteeType.options'),
      valueLink: this.valueLink('survey.trust.trusteeType'),
      disabled: submitting,
      error: this.getErrorProps('survey.trust.trusteeType').help,
    };

    return (
      <Row className='append-xs-2'>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
          {data.getIn([ 'survey', 'trust', 'trusteeType' ]) &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage('trust.trusteeType.advice'))} />}
        </Col>
      </Row>
    );
  }

  renderDeedSupplier() {
    const { data } = this.state;
    const { submitting } = this.props;

    const selectData = {
      question: this.formatMessage(this.getIntlMessage('trust.deedSupplier.question')),
      options: this.translatedOptions('trust.deedSupplier.options'),
      valueLink: this.valueLink('survey.trust.deedSupplier'),
      disabled: submitting,
      error: this.getErrorProps('survey.trust.deedSupplier').help,
      searchable: false,
    };

    return (
      <Row className='append-xs-2'>
        <Col xs={24}>
          <SelectQuestion {...selectData}></SelectQuestion>
        </Col>
      </Row>
    );
  }

  renderYearLastUpdated() {
    const { data } = this.state;
    const { submitting } = this.props;

    const selectData = {
      question: this.formatMessage(this.getIntlMessage('trust.yearLastUpdated.question')),
      options: this.translatedOptions('trust.yearLastUpdated.options'),
      valueLink: this.valueLink('survey.trust.yearLastUpdated'),
      disabled: submitting,
      error: this.getErrorProps('survey.trust.yearLastUpdated').help,
    };

    return (
      <Row className='append-xs-2'>
        <Col xs={24}>
          <SelectQuestion {...selectData}></SelectQuestion>
          {data.getIn([ 'survey', 'trust', 'yearLastUpdated' ]) &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage('trust.yearLastUpdated.advice'))} />}
        </Col>
      </Row>
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
