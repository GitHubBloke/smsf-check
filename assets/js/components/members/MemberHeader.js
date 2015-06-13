import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import BaseComponent from '../../utils/BaseComponent';
import Icon from '../Icon';

export default class MemberHeader extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_toggleEditable');
    this.state = { data: Immutable.fromJS({ isEditing: false, name: props.name }) };
  }

  render() {
    const { name, editable, children } = this.props;
    const { data } = this.state;
    const isEditing = data.get('isEditing');

    return (
      <div className='well__header member__header'>
        <div className='member__name'>
          {editable ? this.renderEditable() : this.renderStatic()}
        </div>
        {!isEditing && children}
      </div>
    );
  }

  renderStatic() {
    const { name } = this.props;
    return <h4>{name}</h4>;
  }

  renderEditable() {
    const { name } = this.props;
    const { data } = this.state;
    const isEditing = data.get('isEditing');

    return !isEditing ?
      <h4>
        <a className='member__edit' onClick={this._toggleEditable}>
          {name}
          <Icon id='edit' />
        </a>
      </h4> :
      <Input ref='input' type='text' valueLink={this.linkState('name')} onBlur={this._toggleEditable}
        bsSize='large' className='input-lg text-center' groupClassName='append-xs-none' />;
  }

  _toggleEditable() {
    const { onChange } = this.props;
    const { data } = this.state;
    const isEditing = data.get('isEditing');

    if (isEditing) { onChange(data.get('name')); }

    this._setState('isEditing', !this.state.data.get('isEditing'), () => {
      if (!isEditing) { this.refs.input.getInputDOMNode().focus(); }
    });
  }
}

MemberHeader.propTypes = {
  name: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
MemberHeader.defaultProps = { editable: false, onChange: () => {} };
