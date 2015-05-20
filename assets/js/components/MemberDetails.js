import Immutable, { Map } from 'immutable';
import Joi from 'joi';
import { Input, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

import SurveyActionCreators from '../actions/SurveyActionCreators';
import Validatable from '../utils/Validatable';

export default class MemberDetails extends Validatable {
  constructor(props) {
    super(props);
    this.bind('validate');
    this.state = { data: Map({ member: props.member }) };
  }

  componentDidMount() {
    SurveyActionCreators.addValidator(this.validate);
  }

  componentDidUnmount() {
    SurveyActionCreators.removeValidator(this.validate);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMember = prevState.data.get('member');
    const member = this.state.data.get('member');
    if (prevMember !== member) {
      SurveyActionCreators.makeMemberDirty(prevMember, member);
    }
  }

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
            <RadioGroup name='isRetired' {...this.valueLink('member.isRetired', () => {}, (v) => v === 'true')}>
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
}

MemberDetails.propTypes = {};
MemberDetails.defaultProps = {};

MemberDetails.schema = {
  member: {
    preRetirementAnnualIncome: Joi.number().required().label('Pre-retirement Annual Income'),
    currentMemberBalance: Joi.number().required().label('Current Member Balance'),
  },
};
