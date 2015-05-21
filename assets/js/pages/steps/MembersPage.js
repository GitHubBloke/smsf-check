import Immutable from 'immutable';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BaseComponent from '../../utils/BaseComponent';
import BasePage from './BasePage';
import locals from '../../utils/locals';
import MemberDetails from '../../components/MemberDetails';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';

class MembersPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderChart', 'renderMember', '_addMember');
  }

  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('members.title'))}`}>
        <BasePage {...this.props} renderForm={this.renderForm} renderChart={this.renderChart}></BasePage>
      </DocumentTitle>
    );
  }

  renderForm() {
    const { survey, submitting } = this.props;

    return (
      <div>
        <h3 className='append-xs-2'>
          <FM message={this.getIntlMessage('members.question')} />
        </h3>
        <Row>
          {survey.get('members').map(this.renderMember)}
          <Col md={12}>
            <Button block bsSize='large' onClick={this._addMember}>
              Add a member
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  renderChart() {
    return <div></div>;
  }

  renderMember(member, index) {
    return (
      <Col key={index} md={12} className='append-xs-tiny'>
        <MemberDetails member={member} />
      </Col>
    );
  }

  _addMember() {
    const { survey } = this.props;
    SurveyActionCreators.addMember({ name: `Member ${survey.get('members').size + 1}`, gender: 'male' });
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
  return { survey, submitting };
}

export default connectToStores(MembersPage,
  [ SurveyStore ],
  pickProps,
  getState
);
