import _ from 'lodash';
import Immutable from 'immutable';
import Joi from 'joi';
import React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage as FM, FormattedHTMLMessage as FHM } from '../../shims/ReactIntl';

import AdviceBubble from '../../components/survey/AdviceBubble';
import BasePage from './BasePage';
import BaseComponent from '../../utils/BaseComponent';
import Icon from '../../components/Icon';
import locals from '../../utils/locals';
import MemberBeneficiary from '../../components/members/MemberBeneficiary';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class EstatePlanningPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', 'renderMember');
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
      <div className='append-xs-2'>
        {this.renderRadioQuestion('estatePlanning.haveBeneficiary', 'survey.estatePlanning.haveBeneficiary')}

        {data.getIn([ 'survey', 'estatePlanning', 'haveBeneficiary' ]) === 'Yes' &&
          <Row className='members'>
            {survey.get('members').map(this.renderMember)}
          </Row>}

        {data.getIn([ 'survey', 'estatePlanning', 'haveBeneficiary' ]) &&
          <div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('estatePlanning.advice'))} /></div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('members.typesOfBenefits.advice'))} /></div>
            <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('members.beneficiary.advice'))} /></div>
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
        <MemberBeneficiary member={member} />
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
