import _ from 'lodash';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import AdviceBubble from '../../components/survey/AdviceBubble';
import BasePage from './BasePage';
import MemberBeneficiary from '../../components/members/MemberBeneficiary';
import MemberPowers from '../../components/members/MemberPowers';
import MemberWill from '../../components/members/MemberWill';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class EstatePlanningPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', 'renderMemberBeneficiary', 'renderMemberWill', 'renderMemberPowers');
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
        prevRoute='investment-strategy' nextRoute='insurance'>
      </SurveyForm>
    );
  }

  renderForm() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <div>
        <div className='append-xs-2'>
          <div className='append-xs-2'>
            <RadioQuestion {...this.questionProps('estatePlanning.haveBeneficiary')} />
          </div>

          {data.getIn([ 'survey', 'estatePlanning', 'haveBeneficiary' ]) === 'yes' &&
            <Row className='members'>
              {survey.get('members').map(this.renderMemberBeneficiary)}
            </Row>}

          {data.getIn([ 'survey', 'estatePlanning', 'haveBeneficiary' ]) !== void 0 &&
            <div>
              <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('estatePlanning.advice'))} /></div>
              <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('member.typesOfBenefits.advice'))} /></div>
              <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('member.beneficiary.advice'))} /></div>
            </div>}
        </div>

        <div className='append-xs-2'>
          <div className='append-xs-2'>
            <RadioQuestion {...this.questionProps('estatePlanning.haveWills')} />
          </div>

          {data.getIn([ 'survey', 'estatePlanning', 'haveWills' ]) === 'yes' &&
            <Row className='members'>
              {survey.get('members').map(this.renderMemberWill)}
            </Row>}
        </div>

        <div className='append-xs-2'>
          <div className='append-xs-2'>
            <RadioQuestion {...this.questionProps('estatePlanning.havePowers')} />
          </div>

          {data.getIn([ 'survey', 'estatePlanning', 'havePowers' ]) === 'yes' &&
            <Row className='members'>
              {survey.get('members').map(this.renderMemberPowers)}
            </Row>}
        </div>
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
      </div>
    );
  }

  renderMemberBeneficiary(member, index) {
    return (
      <Col key={member.get('id')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberBeneficiary member={member} />
      </Col>
    );
  }

  renderMemberWill(member, index) {
    return (
      <Col key={member.get('id')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberWill member={member} />
      </Col>
    );
  }

  renderMemberPowers(member, index) {
    return (
      <Col key={member.get('id')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberPowers member={member} />
      </Col>
    );
  }
}

EstatePlanningPage.propTypes = {};
EstatePlanningPage.defaultProps = {};

EstatePlanningPage.schema = {
  survey: {
    estatePlanning: {
      haveBeneficiary: Joi.string().required().label('This field'),
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

export default wrapSurvey({ confirmDirtySurvey: true }, connectToStores(EstatePlanningPage,
  [ SurveyStore ],
  pickProps,
  getState
));
