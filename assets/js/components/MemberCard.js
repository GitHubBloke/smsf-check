import { Map } from 'immutable';
import React, { PropTypes } from 'react';

import SurveyActionCreators from '../actions/SurveyActionCreators';
import Validatable from '../utils/Validatable';

export default class MemberCard extends Validatable {
  constructor(props) {
    super(props);
    this.bind('validate', 'deleteMember');
    this.state = { data: Map({ member: props.member }) };
  }

  componentDidMount() {
    SurveyActionCreators.addValidator(this.validate);
  }

  componentWillUnmount() {
    SurveyActionCreators.removeValidator(this.validate);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMember = prevState.data.get('member');
    const member = this.state.data.get('member');
    if (prevMember !== member) {
      SurveyActionCreators.makeMemberDirty(prevMember, member);
    }
  }

  deleteMember() {
    if (confirm(this.formatMessage(this.getIntlMessage('members.delete.confirmation')))) {
      SurveyActionCreators.deleteMember(this.state.data.get('member'));
    }
  }
}

MemberCard.propTypes = { member: PropTypes.instanceOf(Map) };
MemberCard.defaultProps = {};

MemberCard.schema = { member: {} };
