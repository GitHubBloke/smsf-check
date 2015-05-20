import _ from 'lodash';
import Joi from 'joi';
import { Input, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

import MemberCard from './MemberCard';

export default class MemberDetails extends MemberCard {
  render() {
    const { data } = this.state;

    return (
      <Well className='text-center'>
        <Input type='text' bsSize='large' className='input-lg' labelClassName='append-xs-tiny text-normal'
          label={this.formatMessage(this.getIntlMessage('members.preRetirementAnnualIncome.label'))}
          addonBefore='$'
          valueLink={this.linkState('member.preRetirementAnnualIncome')}
          {...this.getErrorProps('member.preRetirementAnnualIncome')} />

        <Input type='text' bsSize='large' className='input-lg' labelClassName='append-xs-tiny text-normal'
          label={this.formatMessage(this.getIntlMessage('members.currentMemberBalance.label'))}
          addonBefore='$'
          valueLink={this.linkState('member.currentMemberBalance')}
          {...this.getErrorProps('member.currentMemberBalance')} />

        <div className='form-group append-xs-none'>
          <label className='append-xs-tiny text-normal'>
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
