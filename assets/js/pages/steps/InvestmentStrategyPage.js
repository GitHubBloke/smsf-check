import _ from 'lodash';
import Joi from 'joi';
import React from 'react';
import { Col, Input, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BasePage from './BasePage';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class InvestmentStrategy extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', '_renderAssetAllocation');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='investment-advice' nextRoute='estate-planning'>
      </SurveyForm>
    );
  }

  renderForm() {
    const { data } = this.state;

    return (
      <div>
        <div className='append-xs-2'>{this.renderRadioQuestion('investmentStrategy.hasStrategy', 'survey.investmentStrategy.hasStrategy', true)}</div>
        {(data.getIn([ 'survey', 'investmentStrategy', 'hasStrategy' ]) === 'Yes') && this.renderStrategyQuestions()}
      </div>
    );
  }

  renderStrategyQuestions() {
    return (
      <div>
        <div className='append-xs-2'>{this.renderRadioQuestion('investmentStrategy.considerations', 'survey.investmentStrategy.considerations')}</div>
        <div className='append-xs-2'>{this.renderSelectQuestion('investmentStrategy.yearLastUpdated', 'survey.investmentStrategy.yearLastUpdated', true)}</div>
        <div className='append-xs-2'>{this.renderAssetAllocations()}</div>
      </div>
    );
  }

  renderCharts() {
    return <div></div>;
  }

  renderAssetAllocations() {
    const { data } = this.state;
    const { submitting } = this.props;

    const assetAllocations = [
      'cashAndFixedInterest',
      'australianEquities',
      'internationalEquities',
      'directProperty',
      'internationalCashAndFixedInterest',
      'internationalShares',
      'listedProperty',
      'mortgages',
      'other',
    ];

    return (
      <Row>
        <Col xs={24}>
          <h3 className='prepend-xs-none append-xs-1'>
            <FM message={this.getIntlMessage('investmentStrategy.assetAllocations.question')} />
          </h3>
          {_.map(assetAllocations, this._renderAssetAllocation)}
        </Col>
      </Row>
    );
  }

  _renderAssetAllocation(field) {
    const { submitting } = this.props;

    return (
      <Row key={field}>
        <Col md={12}>
          <Input type='text' bsSize='large' addonBefore='%'
            className='input-lg' groupClassName='append-xs-tiny'
            placeholder={this.formatMessage(this.getIntlMessage(`investmentStrategy.assetAllocations.assets.${field}`))}
            valueLink={this.linkState(`survey.investmentStrategy.${field}`)}
            disabled={submitting}
            {...this.getErrorProps(`survey.investmentStrategy.${field}`)} />
        </Col>
      </Row>
    );
  }
}

InvestmentStrategy.propTypes = {};
InvestmentStrategy.defaultProps = {};

InvestmentStrategy.schema = {
  survey: {
    investmentStrategy: {
      hasStrategy: Joi.string().required().label('This field'),
      considerations: Joi.string().label('This field').when('hasStrategy', { is: 'Yes', then: Joi.required() }),
      yearLastUpdated: Joi.string().label('This field').when('hasStrategy', { is: 'Yes', then: Joi.required() }),

      cashAndFixedInterest: Joi.number().label('This field'),
      australianEquities: Joi.number().label('This field'),
      internationalEquities: Joi.number().label('This field'),
      directProperty: Joi.number().label('This field'),
      internationalCashAndFixedInterest: Joi.number().label('This field'),
      internationalShares: Joi.number().label('This field'),
      listedProperty: Joi.number().label('This field'),
      mortgages: Joi.number().label('This field'),
      other: Joi.number().label('This field'),
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

export default wrapSurvey({ requireSkippable: true, confirmDirtySurvey: true }, connectToStores(InvestmentStrategy,
  [ SurveyStore ],
  pickProps,
  getState
));
