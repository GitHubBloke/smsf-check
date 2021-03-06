import uuid from 'node-uuid';
import React from 'react';
import { Button, Col, Grid, Modal, OverlayMixin, Row } from 'react-bootstrap';
import { FormattedMessage as FM, FormattedHTMLMessage as FHM } from '../../shims/ReactIntl';
import reactMixin from 'react-mixin';

import AdviceBubble from '../../components/survey/AdviceBubble';
import BasePage from './BasePage';
import Icon from '../../components/Icon';
import locals from '../../utils/locals';
import MemberDetails from '../../components/members/MemberDetails';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyForm from '../../components/survey/SurveyForm';
import SurveyStore from '../../stores/SurveyStore';
import { wrapSurvey } from '../../utils/SurveyUtils';

class MembersPage extends BasePage {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderCharts', 'renderMember', '_toggleModal', '_addMember');
  }

  componentDidMount() {
    const { survey, submitting } = this.props;
    if (survey.get('members').isEmpty()) {
      this._setState('isModalOpen', true);
      this._addMember();
    }
  }

  render() {
    return (
      <SurveyForm {...this.props}
        renderForm={this.renderForm}
        renderCharts={this.renderCharts}
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
          {survey.get('members').size < 4 &&
            <Col md={12} className={(survey.get('members').size % 2 === 0) && 'clear-md clear-lg'}>
              <Button block className='btn-dashed btn-xl text-normal members__add'
                disabled={submitting} onClick={this._addMember}>
                <Icon id='ios-plus-outline' size='lg' />
                &nbsp;&nbsp;
                <FM message={this.getIntlMessage('members.add.actionLabel')} />
              </Button>
            </Col>}
        </Row>
        <div className='append-xs-2'>
          <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('members.smsfBasics.advice'))} /></div>
          <div><AdviceBubble advice={this.formatMessage(this.getIntlMessage('members.smsfRightForMe.advice'))} /></div>
        </div>
      </div>
    );
  }

  renderCharts(options) {
    return (
      <div className='charts'>
        {this.renderChart(require('../../charts/members/age'), options)}
        {this.renderChart(require('../../charts/members/gender'), options)}
        {this.renderChart(require('../../charts/members/size'), options)}
        {this.renderChart(require('../../charts/members/balance'), options)}
        {this.renderChart(require('../../charts/members/income'), options)}
        {this.renderChart(require('../../charts/members/fund-balance'), options)}
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

  renderOverlay() {
    const { data } = this.state;

    if (!data.get('isModalOpen')) { return <span/>; }

    return (
      <Modal bsSize='medium' onRequestHide={this._toggleModal}>
        <div className='modal-body text-center'>
          <h3 className='text-primary append-xs-2'>
            <FM message={this.getIntlMessage('welcome.title')} name={locals.name} />
          </h3>

          <Grid fluid>
            <Row>
              <Col md={20} mdOffset={2}>
                <FHM message={this.getIntlMessage('welcome.body')} brand={locals.brand} />

                <Button bsStyle='primary' bsSize='large' className='btn--wide prepend-xs-1 append-xs-1'
                  onClick={this._toggleModal}>
                  <FM message={this.getIntlMessage('welcome.start.actionLabel')} />
                </Button>
                <hr className='append-xs-1' />
                <p className='text-center small append-xs-2'>
                  <FM message={this.getIntlMessage('shared.adviceDisclaimer.text')} />
                </p>
              </Col>
            </Row>
          </Grid>
        </div>
      </Modal>
    );
  }

  _toggleModal() {
    this._setState('isModalOpen', !this.state.data.get('isModalOpen'));
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

reactMixin.onClass(MembersPage, OverlayMixin);
