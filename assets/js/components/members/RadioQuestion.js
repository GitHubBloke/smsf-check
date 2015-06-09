import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import RadioGroup from 'react-radio';

import BaseComponent from '../../utils/BaseComponent';

export default class RadioQuestion extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderOption');
  }

  render() {
    const { id, label, bsStyle, help, valueLink, options } = this.props;

    return (
      <div className={classNames('form-group', (bsStyle === 'error') && 'has-error')}>
        <label className='control-label append-xs-tiny text-normal'>{label}</label>
        <div className='form-inline'>
          <RadioGroup name={id} {...this.props} value={valueLink.value} onChange={valueLink.requestChange}>
            {_.map(options, this.renderOption)}
          </RadioGroup>
        </div>
        {help && <div className='help-block' dangerouslySetInnerHTML={{ __html: help }}></div>}
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
      <div key={value} className='radio-inline'>
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

