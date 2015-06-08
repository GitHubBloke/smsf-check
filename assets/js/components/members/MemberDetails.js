import _ from 'lodash';
import classNames from 'classnames';
import Joi from 'joi';
import moment from 'moment';
import { Button, Col, Input, Row, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../../shims/ReactIntl';
import RadioGroup from 'react-radio';

import GenderOption from './GenderOption';
import Icon, { IconStack } from '../Icon';
import MemberCard from './MemberCard';
import SurveyStore from '../../stores/SurveyStore';
import { connectToStores } from '../../utils/StoreUtils';

export default class MemberDetails extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;
    const isRetiredHasError = this.hasError('member.isRetired');

    return (
      <Well className='text-center member append-xs-none'>
        {this.renderHeader()}

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>

          <div className='form-group append-xs-1'>
            <label className='control-label text-normal'>
              <FM message={this.getIntlMessage('members.gender.label')} />
            </label>
            <Row>
              <Col xs={10} xsOffset={2}>
                <GenderOption gender='female' {...this.linkState('member.gender')} disabled={submitting} />
              </Col>
              <Col xs={10}>
                <GenderOption gender='male' {...this.linkState('member.gender')} disabled={submitting} />
              </Col>
            </Row>
          </div>

          <Input type='text' bsSize='large'
            className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1'
            placeholder='DD / MM / YYYY'
            label={this.formatMessage(this.getIntlMessage('members.dateOfBirth.label'))}
            valueLink={this.linkState('member.dateOfBirth', this._santizeDate, this._dateToString)}
            disabled={submitting}
            {...this.getErrorProps('member.dateOfBirth')} />

          <Input type='text' bsSize='large'
            className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1'
            label={this.formatMessage(this.getIntlMessage('members.preRetirementAnnualIncome.label'))}
            addonBefore='$'
            valueLink={this.linkState('member.preRetirementAnnualIncome')}
            disabled={submitting}
            {...this.getErrorProps('member.preRetirementAnnualIncome')} />

          <Input type='text' bsSize='large'
            className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1'
            label={this.formatMessage(this.getIntlMessage('members.currentMemberBalance.label'))}
            addonBefore='$'
            valueLink={this.linkState('member.currentMemberBalance')}
            disabled={submitting}
            {...this.getErrorProps('member.currentMemberBalance')} />

          {this.renderBooleanQuestion('members.isRetired', 'member.isRetired')}
        </div>
      </Well>
    );
  }

  renderHeader() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <div className='well__header member__header'>
        <div className='member__name'>
          <h4>{data.getIn([ 'member', 'name' ])}</h4>
        </div>
        {survey.get('members').size > 1 && this.renderDeleteButton()}
      </div>
    );
  }

  renderDeleteButton() {
    return (
      <a href='#' className='member__delete link-plain pull-right' onClick={this.deleteMember}>
        <Icon id='ios-close-outline' size='3x' className='text-alpha' />
      </a>
    );
  }

  _isRetiredSetModifier(v) { return v === 'true'; }
  _isRetiredGetModifier(v) { return v !== void 0 ? v.toString() : v; }

  _santizeDate(date) {
    date = date.replace(/[^0-9.]/g, '');

    let day = date.substring(0, 2);
    let month = date.substring(2, 4);
    let year = date.substring(4);

    if (parseInt(day, 10) > 31) {
      day = date.substring(0, 1);
      month = date.substring(1, 3);
      year = date.substring(3);
    }

    if (parseInt(month, 10) > 12) {
      month = date.substring(2, 3);
      year = date.substring(3);
    }

    if (month && day.length === 1) { day = `0${day}`; }
    if (year && month.length === 1) { month = `0${month}`; }

    return day + (month ? ' / ' + month : '') + (year ? ' / ' + year : '');
  }
}

MemberDetails.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberDetails.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberDetails.schema = {
  member: {
    name: Joi.string().required().label('This field'),
    dateOfBirth: Joi.date().format('DD / MM / YYYY').required().label('This field'),
    preRetirementAnnualIncome: Joi.number().required().label('This field'),
    currentMemberBalance: Joi.number().required().label('This field'),
    isRetired: Joi.bool().required().label('This field'),
  },
};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const survey = SurveyStore.getDirtySurvey();
  const submitting = SurveyStore.isSaving();
  return { survey, submitting };
}

export default connectToStores(MemberDetails,
  [ SurveyStore ],
  pickProps,
  getState
);