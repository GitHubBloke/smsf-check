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

export default class MemberWill extends MemberCard {
  render() {
    const { data } = this.state;
    const { survey, submitting } = this.props;

    return (
      <Well className='text-center member append-xs-none'>
        <MemberHeader name={data.getIn([ 'member', 'name' ])} />

        <div className='well__body'>
          <div className={classNames(`avatar-${data.getIn([ 'member', 'gender' ])}`, 'member__avatar', 'append-xs-1')}></div>
          <RadioQuestion {...this.questionProps('member.hasWill', { getter: this.booleanGetModifier, setter: this.booleanSetModifier })} />
        </div>
      </Well>
    );
  }
}

MemberWill.propTypes = _.assign({}, MemberCard.propTypes, {});
MemberWill.defaultProps = _.assign({}, MemberCard.defaultProps, {});

MemberWill.schema = {
  member: {
    hasWill: Joi.bool().required().label('This field'),
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

export default connectToStores(MemberWill,
  [ SurveyStore ],
  pickProps,
  getState
);
