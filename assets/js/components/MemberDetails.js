import _ from 'lodash';
import classNames from 'classnames';
import Joi from 'joi';
import { Button, Col, Input, Row, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

import GenderOption from './GenderOption';
import Icon, { IconStack } from './Icon';
import MemberCard from './MemberCard';

export default class MemberDetails extends MemberCard {
  render() {
    const { data } = this.state;
    const isRetiredHasError = this.hasError('member.isRetired');

    return (
      <Well className='text-center'>
        <div className='well__header'>
          <a className='link-plain pull-right'>
            <Icon id='ios-close-outline' size='2' className='text-alpha' />
          </a>
        </div>

        <div className='form-group append-xs-1'>
          <label className='control-label text-normal'>Gender</label>
          <Row>
            <Col xs={9} xsOffset={3}>
              <GenderOption gender='female' {...this.linkState('member.gender')} />
            </Col>
            <Col xs={9}>
              <GenderOption gender='male' {...this.linkState('member.gender')} />
            </Col>
          </Row>
        </div>

        <Input type='text' bsSize='large'
          className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1'
          label={this.formatMessage(this.getIntlMessage('members.preRetirementAnnualIncome.label'))}
          addonBefore='$'
          valueLink={this.linkState('member.preRetirementAnnualIncome')}
          {...this.getErrorProps('member.preRetirementAnnualIncome')} />

        <Input type='text' bsSize='large'
          className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1'
          label={this.formatMessage(this.getIntlMessage('members.currentMemberBalance.label'))}
          addonBefore='$'
          valueLink={this.linkState('member.currentMemberBalance')}
          {...this.getErrorProps('member.currentMemberBalance')} />

        <div className={classNames('form-group append-xs-none', isRetiredHasError && 'has-error')}>
          <label className='control-label append-xs-tiny text-normal'>
            <FM message={this.getIntlMessage('members.isRetired.label')} />
          </label>
          <div className='row form-inline'>
            <RadioGroup name='isRetired'
              {...this.valueLink('member.isRetired', () => {}, this._isRetiredGetModifier, this._isRetiredSetModifier)}>
              <div className='col-xs-6 col-xs-offset-6'>
                <label className='text-normal'>
                  <input type='radio' value={true} />&nbsp;
                  <FM message={this.getIntlMessage('members.isRetired.options.yes')} />
                </label>
              </div>
              <div className='col-xs-6'>
                <label className='text-normal'>
                  <input type='radio' value={false} />&nbsp;
                  <FM message={this.getIntlMessage('members.isRetired.options.no')} />
                </label>
              </div>
            </RadioGroup>
          </div>
          {isRetiredHasError && <div className='help-block'>{this.getErrorProps('member.isRetired').help}</div>}
        </div>
      </Well>
    );
  }

  _isRetiredSetModifier(v) { return v === 'true'; }
  _isRetiredGetModifier(v) { return v !== void 0 ? v.toString() : v; }
}

MemberDetails.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberDetails.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberDetails.schema = {
  member: {
    preRetirementAnnualIncome: Joi.number().required().label('This field'),
    currentMemberBalance: Joi.number().required().label('This field'),
    isRetired: Joi.bool().required().label('This field'),
  },
};
