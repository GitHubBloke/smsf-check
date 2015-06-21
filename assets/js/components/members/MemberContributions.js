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

export default class MemberContributions extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        <MemberHeader name={data.getIn([ 'member', 'name' ])} />

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>

          <h4 className='append-xs-2'>
            <FM message={this.getIntlMessage('member.contributionsTitle')} />
          </h4>

          <div className='text-left'>
            {data.get('member.hasConcessionalContribution'.split('.'))}
            <Input type='checkbox'
              {...this.questionProps('member.hasConcessionalContribution', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <Input type='text' bsSize='large'
              {...this.questionProps('member.concessionalContributionAmount')}
              className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <SelectQuestion {...this.questionProps('member.concessionalContributionInterval')} />

            <Input type='checkbox'
              {...this.questionProps('member.hasNonConcessionalContribution', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <Input type='text' bsSize='large'
              {...this.questionProps('member.nonConcessionalContributionAmount')}
              className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <SelectQuestion {...this.questionProps('member.nonConcessionalContributionInterval')} />

            <Input type='checkbox'
              {...this.questionProps('member.hasOtherContribution', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <Input type='text' bsSize='large'
              {...this.questionProps('member.otherContributionAmount')}
              className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            <SelectQuestion {...this.questionProps('member.otherContributionInterval')} />
          </div>
        </div>
      </Well>
    );
  }
}

MemberContributions.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberContributions.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberContributions.schema = {
  member: {
    concessionalContributionAmount: Joi.label('This field').when('hasConcessionalContribution', { is: true, then: Joi.number().required() }),
    concessionalContributionInterval: Joi.label('This field').when('hasConcessionalContribution', { is: true, then: Joi.string().required() }),

    nonConcessionalContributionAmount: Joi.label('This field').when('hasNonConcessionalContribution', { is: true, then: Joi.number().required() }),
    nonConcessionalContributionInterval: Joi.label('This field').when('hasNonConcessionalContribution', { is: true, then: Joi.string().required() }),

    otherContributionAmount: Joi.label('This field').when('hasOtherContribution', { is: true, then: Joi.number().required() }),
    otherContributionInterval: Joi.label('This field').when('hasOtherContribution', { is: true, then: Joi.string().required() }),
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

export default connectToStores(MemberContributions,
  [ SurveyStore ],
  pickProps,
  getState
);
