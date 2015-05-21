import _ from 'lodash';
import classNames from 'classnames';
import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import RadioGroup from 'react-radio';

import BaseComponent from '../utils/BaseComponent';

export default class RadioQuestion extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderOption');
  }

  render() {
    const { question, options, valueLink, error } = this.props;

    return (
      <div>
        <h3 className='append-xs-1'>{question}</h3>
        <div className={classNames('form-group', error && 'has-error')}>
          <RadioGroup name={question} {...valueLink}>
            {_.map(options, this.renderOption)}
          </RadioGroup>
          {error && <div className='help-block'>{error}</div>}
        </div>
      </div>
    );
  }

  renderOption(option) {
    const { disabled } = this.props;
    let label, value;

    if (_.isObject(option)) {
      label = option.label;
      value = option.value;
    } else {
      label = value = option;
    }

    return (
      <div key={value} className='radio'>
        <label className='text-normal'>
          <input type='radio' value={value} disabled={disabled} />&nbsp;
          {label}
        </label>
      </div>
    );
  }
}

RadioQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  valueLink: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

