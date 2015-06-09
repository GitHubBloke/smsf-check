import classNames from 'classnames';
import { Map } from 'immutable';
import React, { PropTypes } from 'react';

import SurveyActionCreators from '../../actions/SurveyActionCreators';
import Validatable from '../../utils/Validatable';

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

  questionProps(path, { getter, setter } = {}) {
    const { member } = this.props;
    let options;

    try { options = this.translatedOptions(`${path}.options`); } catch(e) {}

    return {
      id: `${member.get('id') || member.get('ref')}-${path}`,
      label: this.formatMessage(this.getIntlMessage(`${path}.label`)),
      valueLink: this.linkState(path, setter, getter),
      disabled: this.props.submitting,
      options,
      ...this.getErrorProps(path),
    };
  }

  booleanSetModifier(v) { return v === 'true'; }
  booleanGetModifier(v) { return v !== void 0 ? v.toString() : v; }
}

MemberCard.propTypes = { member: PropTypes.instanceOf(Map) };
MemberCard.defaultProps = {};

MemberCard.schema = { member: {} };
