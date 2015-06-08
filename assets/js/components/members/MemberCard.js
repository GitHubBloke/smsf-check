import classNames from 'classnames';
import { Map } from 'immutable';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

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
    console.log('validator added');
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

  renderBooleanQuestion(messagePath, dataPath) {
    const { data } = this.state;
    const { submitting } = this.props;
    const error = this.getErrorProps(dataPath).help;

    return (
      <div className={classNames('form-group append-xs-none', error && 'has-error')}>
        <label className='control-label append-xs-tiny text-normal'>
          <FM message={this.getIntlMessage(`${messagePath}.label`)} />
        </label>
        <div className='row form-inline'>
          <RadioGroup name={`${dataPath}-${data.getIn([ 'member', 'id' ]) || data.getIn([ 'member', 'ref' ])}`}
            {...this.valueLink(dataPath, () => {}, this._booleanGetModifier, this._booleanSetModifier)}>
            <div className='col-xs-6 col-xs-offset-6'>
              <label className='text-normal'>
                <input type='radio' value={true} disabled={submitting} />&nbsp;
                <FM message={this.getIntlMessage(`${messagePath}.options.yes`)} />
              </label>
            </div>
            <div className='col-xs-6'>
              <label className='text-normal'>
                <input type='radio' value={false} disabled={submitting} />&nbsp;
                <FM message={this.getIntlMessage(`${messagePath}.options.no`)} />
              </label>
            </div>
          </RadioGroup>
        </div>
        {error && <div className='help-block' dangerouslySetInnerHTML={{ __html: error }}></div>}
      </div>
    );
  }

  _booleanSetModifier(v) { return v === 'true'; }
  _booleanGetModifier(v) { return v !== void 0 ? v.toString() : v; }
}

MemberCard.propTypes = { member: PropTypes.instanceOf(Map) };
MemberCard.defaultProps = {};

MemberCard.schema = { member: {} };
