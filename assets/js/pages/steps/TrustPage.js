import Immutable from 'immutable';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BasePage from './BasePage';
import locals from '../../utils/locals';
import RadioQuestion from '../../components/RadioQuestion';
import { connectToStores } from '../../utils/StoreUtils';
import SelectQuestion from '../../components/SelectQuestion';
import SurveyForm from './SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { requireSkippable } from '../../utils/SurveyUtils';

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
      question: this.getIntlMessage('trust.trusteeType.question'),
      options: this.translatedOptions('trust.trusteeType.options'),
      valueLink: this.valueLink('survey.trusteeType'),
      disabled: submitting,
      error: this.getErrorProps('survey.trusteeType').help,
    };

    return (
      <Row>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
        </Col>
      </Row>
    );
  }

  renderDeedSupplier() {
    const { data } = this.state;
    const { submitting } = this.props;

    const selectData = {
      question: this.getIntlMessage('trust.deedSupplier.question'),
      options: this.translatedOptions('trust.deedSupplier.options'),
      valueLink: this.valueLink('survey.deedSupplier'),
      disabled: submitting,
      error: this.getErrorProps('survey.deedSupplier').help,
      searchable: false,
    };

    return (
      <Row>
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
      question: this.getIntlMessage('trust.yearLastUpdated.question'),
      options: this.translatedOptions('trust.yearLastUpdated.options'),
      valueLink: this.valueLink('survey.yearLastUpdated'),
      disabled: submitting,
      error: this.getErrorProps('survey.yearLastUpdated').help,
    };

    return (
      <Row>
        <Col xs={24}>
          <SelectQuestion {...selectData}></SelectQuestion>
        </Col>
      </Row>
    );
  }
}

TrustPage.propTypes = {};
TrustPage.defaultProps = {};

TrustPage.schema = {
  survey: {
    trusteeType: Joi.string().required().label('This field'),
    deedSupplier: Joi.string().required().label('This field'),
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

export default requireSkippable(connectToStores(TrustPage,
  [ SurveyStore ],
  pickProps,
  getState
));
