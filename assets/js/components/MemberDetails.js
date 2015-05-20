import Immutable from 'immutable';
import Joi from 'joi';
import { Input, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
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
            label='Pre-retirement Annual Income'
            addonBefore='$'
            valueLink={this.linkState('preRetirementAnnualIncome')}
            {...this.getErrorProps('preRetirementAnnualIncome')} />

          <Input type='text' bsSize='large' className='input-lg' labelClassName='append-xs-tiny text-normal'
            label='Current Member Balance'
            addonBefore='$'
            valueLink={this.linkState('currentMemberBalance')}
            {...this.getErrorProps('currentMemberBalance')} />

          <div className='form-group append-xs-none'>
            {this.state.data.get('isRetired')}
            <label className='append-xs-tiny text-normal'>Is the member retired?</label>
            <div className='row form-inline'>
              <RadioGroup {...this.valueLink('isRetired', () => {}, (v) => v === 'true')}>
                <div className='col-xs-6 col-xs-offset-6'>
                  <label><input type='radio' defaultChecked={data.get('isRetired')} value={true} /> Yes</label>
                </div>
                <div className='col-xs-6'>
                  <label><input type='radio' defaultChecked={!data.get('isRetired')} value={false} /> No</label>
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
