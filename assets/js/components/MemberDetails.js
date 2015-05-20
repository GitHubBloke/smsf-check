import Immutable from 'immutable';
import Joi from 'joi';
import { Input, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

import Validatable from '../utils/Validatable';

export default class MemberDetails extends Validatable {
  constructor(props) {
    super(props);
    this.state = { data: props.member };
  }

  render() {
    const { data } = this.state;

    return (
      <Well className='text-center'>
        <form noValidate autoComplete='off'>
          <Input type='text' bsSize='large' className='input-lg' labelClassName='append-xs-tiny text-normal'
            label={this.formatMessage(this.getIntlMessage('members.preRetirementAnnualIncome.label'))}
            addonBefore='$'
            valueLink={this.linkState('preRetirementAnnualIncome')}
            {...this.getErrorProps('preRetirementAnnualIncome')} />

          <Input type='text' bsSize='large' className='input-lg' labelClassName='append-xs-tiny text-normal'
            label={this.formatMessage(this.getIntlMessage('members.currentMemberBalance.label'))}
            addonBefore='$'
            valueLink={this.linkState('currentMemberBalance')}
            {...this.getErrorProps('currentMemberBalance')} />

          <div className='form-group append-xs-none'>
            <label className='append-xs-tiny text-normal'>
              <FM message={this.getIntlMessage('members.isRetired.label')} />
            </label>
            <div className='row form-inline'>
              <RadioGroup name='isRetired' {...this.valueLink('isRetired', () => {}, (v) => v === 'true')}>
                <div className='col-xs-6 col-xs-offset-6'>
                  <label className='text-normal'>
                    <input type='radio' defaultChecked={data.get('isRetired')} value={true} />&nbsp;
                    <FM message={this.getIntlMessage('members.isRetired.options.yes')} />
                  </label>
                </div>
                <div className='col-xs-6'>
                  <label className='text-normal'>
                    <input type='radio' defaultChecked={!data.get('isRetired')} value={false} />&nbsp;
                    <FM message={this.getIntlMessage('members.isRetired.options.no')} />
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
      </Well>
    );
  }
}

MemberDetails.propTypes = {};

MemberDetails.schema = {
  preRetirementAnnualIncome: Joi.number().required().label('Pre-retirement Annual Income'),
  currentMemberBalance: Joi.number().required().label('Current Member Balance'),
};
