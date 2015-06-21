import _ from 'lodash';
import classNames from 'classnames';
import Joi from 'joi';
import { Input, Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import Icon, { IconStack } from '../Icon';
import MemberCard from './MemberCard';
import MemberHeader from './MemberHeader';
import RadioQuestion from './RadioQuestion';
import SelectQuestion from './SelectQuestion';
import SurveyStore from '../../stores/SurveyStore';
import { connectToStores } from '../../utils/StoreUtils';

export default class MemberInsurance extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        <MemberHeader name={data.getIn([ 'member', 'name' ])} />

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>

          <h4 className='append-xs-2'>
            <FM message={this.getIntlMessage('member.insuranceTitle')} />
          </h4>

          <div className='text-left'>
            <Input type='checkbox'
              {...this.questionProps('member.hasLifeInsurance', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasLifeInsurance' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.lifeInsuranceAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.lifeInsuranceHeldAt')} />
                <SelectQuestion {...this.questionProps('member.lifeInsuranceInterval')} />
              </div>}

            <Input type='checkbox'
              {...this.questionProps('member.hasDisablement', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasDisablement' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.disablementAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.disablementHeldAt')} />
                <SelectQuestion {...this.questionProps('member.disablementInterval')} />
              </div>}

            <Input type='checkbox'
              {...this.questionProps('member.hasIncomeProtection', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasIncomeProtection' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.incomeProtectionAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.incomeProtectionHeldAt')} />
                <SelectQuestion {...this.questionProps('member.incomeProtectionInterval')} />
              </div>}
          </div>
        </div>
      </Well>
    );
  }
}

MemberInsurance.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberInsurance.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberInsurance.schema = {
  member: {
    lifeInsuranceAmount: Joi.label('This field').when('hasLifeInsurance', { is: true, then: Joi.number().required() }),
    lifeInsuranceHeldAt: Joi.label('This field').when('hasLifeInsurance', { is: true, then: Joi.string().required() }),

    disablementAmount: Joi.label('This field').when('hasDisablement', { is: true, then: Joi.number().required() }),
    disablementHeldAt: Joi.label('This field').when('hasDisablement', { is: true, then: Joi.string().required() }),

    incomeProtectionAmount: Joi.label('This field').when('hasIncomeProtection', { is: true, then: Joi.number().required() }),
    incomeProtectionHeldAt: Joi.label('This field').when('hasIncomeProtection', { is: true, then: Joi.string().required() }),
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

export default connectToStores(MemberInsurance,
  [ SurveyStore ],
  pickProps,
  getState
);
