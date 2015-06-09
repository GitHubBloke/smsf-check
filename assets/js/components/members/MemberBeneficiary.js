import _ from 'lodash';
import classNames from 'classnames';
import Joi from 'joi';
import { Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import RadioQuestion from './RadioQuestion';
import SelectQuestion from './SelectQuestion';

import Icon, { IconStack } from '../Icon';
import MemberCard from './MemberCard';
import SurveyStore from '../../stores/SurveyStore';
import { connectToStores } from '../../utils/StoreUtils';

export default class MemberBeneficiary extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        {this.renderHeader()}

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>

          <SelectQuestion {...this.questionProps('member.typesOfBenefits')} />
          <RadioQuestion {...this.questionProps('member.hasWill', { getter: this.booleanGetModifier, setter: this.booleanSetModifier })} />
          <RadioQuestion {...this.questionProps('member.hasEnduringPowersOfAttorney', { getter: this.booleanGetModifier, setter: this.booleanSetModifier })} />
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
      </div>
    );
  }
}

MemberBeneficiary.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberBeneficiary.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberBeneficiary.schema = {
  member: {
    hasWill: Joi.bool().required().label('This field'),
    hasEnduringPowersOfAttorney: Joi.bool().required().label('This field'),
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

export default connectToStores(MemberBeneficiary,
  [ SurveyStore ],
  pickProps,
  getState
);
