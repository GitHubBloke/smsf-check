import classNames from 'classnames';
import React, { PropTypes } from 'react';

import BaseComponent from '../utils/BaseComponent';
import Icon, { IconStack } from './Icon';

export default class GenderOption extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_setValue');
  }

  render() {
    const { gender, value } = this.props;
    const className = (gender === value ? 'text-primary' : 'text-alpha');

    return (
      <a className='link-plain' href='#' onClick={this._setValue}>
        <IconStack size='2' >
          <Icon id='record' size='2' stacked className='text-inverse' />
          <Icon id='ios-circle-outline' size='2' stacked className={className} />
          <Icon id={gender} size='1' stacked className={className} />
        </IconStack>
      </a>
    );
  }

  _setValue() {
    const { requestChange, gender } = this.props;
    requestChange(gender);
  }
}

GenderOption.propTypes = {
  gender: PropTypes.oneOf([ 'male', 'female' ]),
  value: PropTypes.oneOf([ 'male', 'female' ]),
  requestChange: PropTypes.func.isRequired,
};
