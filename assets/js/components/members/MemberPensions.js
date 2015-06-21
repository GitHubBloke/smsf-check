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

export default class MemberPensions extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        <MemberHeader name={data.getIn([ 'member', 'name' ])} />

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>

          <h4 className='append-xs-2'>
            <FM message={this.getIntlMessage('member.pensionsTitle')} />
          </h4>

          <div className='text-left'>
            <Input type='checkbox'
              {...this.questionProps('member.hasAccountBasedPension', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasAccountBasedPension' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.accountBasedPensionAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.accountBasedPensionInterval')} />
              </div>}

            <Input type='checkbox'
              {...this.questionProps('member.hasTransitionToRetirementPension', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasTransitionToRetirementPension' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.transitionToRetirementAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.transitionToRetirementInterval')} />
              </div>}

            <Input type='checkbox'
              {...this.questionProps('member.hasOtherPension', { checkbox: true })}
              labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
            {data.getIn([ 'member', 'hasOtherPension' ]) &&
              <div>
                <Input type='text' bsSize='large' addonBefore='$'
                  {...this.questionProps('member.otherPensionAmount')}
                  className='input-lg' labelClassName='append-xs-tiny text-normal' groupClassName='append-xs-1' />
                <SelectQuestion {...this.questionProps('member.otherPensionInterval')} />
              </div>}
          </div>
        </div>
      </Well>
    );
  }
}

MemberPensions.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberPensions.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberPensions.schema = {
  member: {
    accountBasedPensionAmount: Joi.number().label('This field').when('hasAccountBasedPension', { is: true, then: Joi.required() }),
    accountBasedPensionInterval: Joi.string().label('This field').when('hasAccountBasedPension', { is: true, then: Joi.required() }),

    transitionToRetirementAmount: Joi.number().label('This field').when('hasTransitionToRetirementPension', { is: true, then: Joi.required() }),
    transitionToRetirementInterval: Joi.string().label('This field').when('hasTransitionToRetirementPension', { is: true, then: Joi.required() }),

    otherPensionAmount: Joi.number().label('This field').when('hasOtherPension', { is: true, then: Joi.required() }),
    otherPensionInterval: Joi.string().label('This field').when('hasOtherPension', { is: true, then: Joi.required() }),
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

export default connectToStores(MemberPensions,
  [ SurveyStore ],
  pickProps,
  getState
);
