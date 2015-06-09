import _ from 'lodash';
import Joi from 'joi';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';

import AdviceBubble from '../../components/survey/AdviceBubble';
import BasePage from './BasePage';
import MemberPensions from '../../components/members/MemberPensions';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class PensionsPage extends BasePage {
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
          <RadioQuestion {...this.questionProps('pensions.havePensions', { getter: this.booleanGetModifier, setter: this.booleanSetModifier })} />
        </div>
        {data.getIn('survey.pensions.havePensions'.split('.'))}

        {data.getIn([ 'survey', 'pensions', 'havePensions' ]) &&
          <Row className='members'>
            {survey.get('members').map(this.renderMember)}
          </Row>}

        {data.getIn([ 'survey', 'pensions', 'havePensions' ]) &&
          <div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('pensions.typesOfPensions.advice'))} /></div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('pensions.shouldStart.advice'))} /></div>
          </div>}
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
      </div>
    );
  }

  renderMember(member, index) {
    return (
      <Col key={member.get('id')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberPensions member={member} />
      </Col>
    );
  }
}

PensionsPage.propTypes = {};
PensionsPage.defaultProps = {};

PensionsPage.schema = {
  survey: {
    insurance: {
      haveInsurance: Joi.bool().required().label('This field'),
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

export default wrapSurvey({ confirmDirtySurvey: true }, connectToStores(PensionsPage,
  [ SurveyStore ],
  pickProps,
  getState
));
