import Immutable from 'immutable';
import uuid from 'node-uuid';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Highcharts from 'react-highcharts/3d';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BasePage from './BasePage';
import BaseComponent from '../../utils/BaseComponent';
import Icon from '../../components/Icon';
import locals from '../../utils/locals';
import MemberDetails from '../../components/MemberDetails';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyForm from '../../components/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

const chartsConfig = {
  age: require('../../charts/members/age'),
  size: require('../../charts/members/size'),
};

class MembersPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderChart', 'renderMember', '_addMember');
  }

  componentDidMount() {
    const { survey, submitting } = this.props;
    if (survey.get('members').isEmpty()) {
      this._addMember();
    }
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderChart={this.renderChart}
        nextRoute='trust'>
      </SurveyForm>
    );
  }

  renderForm() {
    const { survey, submitting } = this.props;

    return (
      <div>
        <h3 className='prepend-xs-none append-xs-2'>
          <FM message={this.getIntlMessage('members.question')} />
        </h3>
        <Row className='members'>
          {survey.get('members').map(this.renderMember)}
          <Col md={12} className={(survey.get('members').size % 2 === 0) && 'clear-md clear-lg'}>
            <Button block className='btn-dashed btn-xl text-normal members__add'
              disabled={submitting} onClick={this._addMember}>
              <Icon id='ios-plus-outline' size='lg' />
              &nbsp;&nbsp;
              <FM message={this.getIntlMessage('members.add.actionLabel')} />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  renderChart(dataSet) {
    return (
      <div>
        {chartsConfig.age[dataSet] && <Highcharts config={chartsConfig.age[dataSet]} />}
        {chartsConfig.size[dataSet] && <Highcharts config={chartsConfig.size[dataSet]} />}
      </div>
    );
  }

  renderMember(member, index) {
    return (
      <Col key={member.get('id') || member.get('ref')} md={12} className={(index % 2 === 0) && 'clear-md clear-lg'}>
        <MemberDetails member={member} />
      </Col>
    );
  }

  _addMember() {
    const { survey } = this.props;
    SurveyActionCreators.addMember({ name: `Member ${survey.get('members').size + 1}`, gender: 'male', ref: uuid.v1() });
  }
}

MembersPage.propTypes = {};
MembersPage.defaultProps = {};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const survey = SurveyStore.getDirtySurvey();
  const submitting = SurveyStore.isSaving();
  const skippable = SurveyStore.isSkippable();
  return { survey, submitting, skippable };
}

export default wrapSurvey({ confirmDirtySurvey: true }, connectToStores(MembersPage,
  [ SurveyStore ],
  pickProps,
  getState
));
