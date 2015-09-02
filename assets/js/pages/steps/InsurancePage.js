import _ from 'lodash';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import AdviceBubble from '../../components/survey/AdviceBubble';
import BasePage from './BasePage';
import MemberInsurance from '../../components/members/MemberInsurance';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class InsurancePage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', 'renderMember');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='estate-planning' nextRoute='pensions'>
      </SurveyForm>
    );
  }

  renderForm() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <div className='append-xs-2'>
        <div className='append-xs-2'>
          <RadioQuestion {...this.questionProps('insurance.haveInsurance')} />
        </div>

        {data.getIn([ 'survey', 'insurance', 'haveInsurance' ]) === 'yes' &&
          <Row className='members'>
            {survey.get('members').map(this.renderMember)}
          </Row>}

        {data.getIn([ 'survey', 'insurance', 'haveInsurance' ]) !== void 0 &&
          <div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('insurance.typesOfInsurance.advice'))} /></div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('insurance.advice'))} /></div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('insurance.howMuchInsurance.advice'))} /></div>
          </div>}
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
        {this.renderChart(require('../../charts/insurance/within-smsf'), options)}
      </div>
    );
  }

  renderMember(member, index) {
    return (
      <Col key={member.get('id')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberInsurance member={member} />
      </Col>
    );
  }
}

InsurancePage.propTypes = {};
InsurancePage.defaultProps = {};

InsurancePage.schema = {
  survey: {
    insurance: {
      haveInsurance: Joi.string().required().label('This field'),
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

export default wrapSurvey({ confirmDirtySurvey: true }, connectToStores(InsurancePage,
  [ SurveyStore ],
  pickProps,
  getState
));
