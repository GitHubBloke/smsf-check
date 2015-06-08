import React, { PropTypes } from 'react';

import BaseComponent from '../../utils/BaseComponent';
import Icon from '../../components/Icon';

export default class AdviceBubble extends BaseComponent {
  render() {
    const { advice } = this.props;

    return (
      <div className='bubble'>
        <Icon id='help-circled' size='lg' className='text-primary' />
        &nbsp;&nbsp;
        {advice}
      </div>
    );
  }
}

AdviceBubble.propTypes = { advice: PropTypes.string.isRequired };
