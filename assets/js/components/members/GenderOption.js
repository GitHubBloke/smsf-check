import classNames from 'classnames';
import React, { PropTypes } from 'react';

import BaseComponent from '../../utils/BaseComponent';
import Icon, { IconStack } from '../Icon';

export default class GenderOption extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_setValue');
  }

  render() {
    const { label, gender, value, disabled } = this.props;
    const className = (gender === value ? 'text-primary' : 'text-alpha');

    return (
      <a className={classNames('gender link-plain link-no-underline', disabled && 'text-alpha')} href='#' onClick={this._setValue}>
        <IconStack size='3x'>
          <Icon id='record' size='2x' stacked className='text-inverse' />
          <Icon id='ios-circle-outline' size='2x' stacked className={className} />
          <Icon id={gender} size='1x' stacked className={className} />
        </IconStack>
        <div className={classNames((gender === value) && 'text-primary')}><small>{label}</small></div>
      </a>
    );
  }

  _setValue(e) {
    const { requestChange, gender } = this.props;
    requestChange(gender);
    e.preventDefault();
  }
}

GenderOption.propTypes = {
  label: PropTypes.oneOf([ 'Male', 'Female' ]),
  gender: PropTypes.oneOf([ 'male', 'female' ]),
  value: PropTypes.oneOf([ 'male', 'female' ]),
  requestChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
GenderOption.defaultProps = {
  disabled: false,
};
