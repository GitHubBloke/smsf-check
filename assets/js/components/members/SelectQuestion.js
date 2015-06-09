import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import Select from 'react-select/lib/Select';

import BaseComponent from '../../utils/BaseComponent';

export default class RadioQuestion extends BaseComponent {
  render() {
    const { id, label, bsStyle, help, valueLink, options } = this.props;

    return (
      <div className={classNames('form-group', (bsStyle === 'error') && 'has-error')}>
        {label && <label className='control-label append-xs-tiny text-normal'>{label}</label>}
        <div className='form-inline'>
          <Select name={id} {...this.props} value={valueLink.value} onChange={valueLink.requestChange} className='Select--lg' />
        </div>
        {help && <div className='help-block' dangerouslySetInnerHTML={{ __html: help }}></div>}
      </div>
    );
  }
}

RadioQuestion.propTypes = {
  options: PropTypes.array.isRequired,
};

