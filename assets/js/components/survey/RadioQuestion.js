import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import RadioGroup from 'react-radio';

import AdviceBubble from './AdviceBubble';
import BaseComponent from '../../utils/BaseComponent';

export default class RadioQuestion extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderOption');
  }

  render() {
    const { label, bsStyle, help, valueLink, advice, options } = this.props;

    return (
      <div>
        <h3 className='prepend-xs-none append-xs-1'>{label}</h3>
        <div className={classNames('form-group', (bsStyle === 'error') && 'has-error')}>
          <RadioGroup name={label} {...this.props} value={valueLink.value} onChange={valueLink.requestChange}>
            {_.map(options, this.renderOption)}
          </RadioGroup>
          {help && <span className='help-block' dangerouslySetInnerHTML={{ __html: help }}></span>}
        </div>
        {advice && (valueLink.value !== void 0) && <AdviceBubble advice={advice} />}
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
  options: PropTypes.array.isRequired,
};

