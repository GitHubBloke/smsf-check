import _ from 'lodash';
import Joi from 'joi';
import React from 'react';
import { Col, Input, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import BasePage from './BasePage';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class InvestmentStrategy extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', 'renderAssetAllocation');
  }

  componentDidUpdate() {
    super.componentDidUpdate(...arguments);

    const { data } = this.state;
    const totalAllocations = _.sum([
      'cashAndFixedInterest',
      'australianEquities',
      'internationalEquities',
      'directProperty',
      'internationalCashAndFixedInterest',
      'internationalShares',
      'listedProperty',
      'mortgages',
      'other',
    ], (asset) => data.getIn([ 'survey', 'investmentStrategy', asset ]));

    if (totalAllocations !== data.get('totalAllocations')) {
      this._setState('totalAllocations', totalAllocations);
    }
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
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('investmentStrategy.hasStrategy')} />
        </div>
        {data.getIn([ 'survey', 'investmentStrategy', 'hasStrategy' ]) === 'yes' && this.renderStrategyQuestions()}
      </div>
    );
  }

  renderStrategyQuestions() {
    return (
      <div>
        <div className='append-xs-2'>
          <SelectQuestion {...this.questionProps('investmentStrategy.yearLastUpdated')} />
        </div>
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
    const { help } = this.getErrorProps('totalAllocations');

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
            <FM message={this.getIntlMessage('investmentStrategy.assetAllocations.label')} />
          </h3>
          <Row>
            {_.map(assetAllocations, this.renderAssetAllocation)}
          </Row>
          {help && <div className='has-error'><div className='help-block' dangerouslySetInnerHTML={{ __html: help }}></div></div>}
        </Col>
      </Row>
    );
  }

  renderAssetAllocation(field) {
    const { submitting } = this.props;

    return (
      <Col key={field} md={12}>
        <Input type='text' bsSize='large' addonBefore='%'
          className='input-lg' groupClassName='append-xs-tiny'
          labelClassName='text-normal'
          label={this.formatMessage(this.getIntlMessage(`investmentStrategy.assetAllocations.assets.${field}`))}
          valueLink={this.linkState(`survey.investmentStrategy.${field}`)}
          disabled={submitting}
          {...this.getErrorProps(`survey.investmentStrategy.${field}`)} />
      </Col>
    );
  }
}

InvestmentStrategy.propTypes = {};
InvestmentStrategy.defaultProps = {};

InvestmentStrategy.schema = {
  survey: {
    investmentStrategy: {
      hasStrategy: Joi.string().required().label('This field'),
      yearLastUpdated: Joi.label('This field').when('hasStrategy', { is: 'yes', then: Joi.string().required() }),

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

  totalAllocations: Joi.label('Percentage of asset allocations').options({ language: { any: { allowOnly: 'must add up to a total of 100' } } }).when('survey.investmentStrategy.hasStrategy', { is: 'yes', then: Joi.any().equal(100) }),
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
