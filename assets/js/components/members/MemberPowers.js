import _ from 'lodash';
import classNames from 'classnames';
import Joi from 'joi';
import { Well } from 'react-bootstrap';
import React, { PropTypes } from 'react';

import Icon, { IconStack } from '../Icon';
import MemberCard from './MemberCard';
import MemberHeader from './MemberHeader';
import RadioQuestion from './RadioQuestion';
import SurveyStore from '../../stores/SurveyStore';
import { connectToStores } from '../../utils/StoreUtils';

export default class MemberPowers extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        <MemberHeader name={data.getIn([ 'member', 'name' ])} />

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>
          <RadioQuestion {...this.questionProps('member.hasEnduringPowersOfAttorney', { getter: this.booleanGetModifier, setter: this.booleanSetModifier })} />
        </div>
      </Well>
    );
  }
}

MemberPowers.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberPowers.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberPowers.schema = {
  member: {
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

export default connectToStores(MemberPowers,
  [ SurveyStore ],
  pickProps,
  getState
);
