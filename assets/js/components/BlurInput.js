import _ from 'lodash';
import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import BaseComponent from '../utils/BaseComponent';

export default class BlurInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_onBlur');
    this.state = { data: Immutable.fromJS({ value: props.valueLink.value }) };
  }

  componentWillReceiveProps(nextProps) {
    this._setState('value', nextProps.valueLink.value);
  }

  render() {
    const props = _.omit(this.props, 'valueLink');
    return <Input {...this.props} valueLink={this.linkState('value')} onBlur={this._onBlur} />;
  }

  _onBlur(e) {
    this.props.valueLink.requestChange(e.target.value);
  }
}

BlurInput.propTypes = {};
