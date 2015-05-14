import classNames from 'classnames';
import React, { PropTypes } from 'react';

import BaseComponent from '../utils/BaseComponent';

export class IconStack extends BaseComponent {
  render() {
    const { id, size, className, children } = this.props;
    return (
      <span className={classNames('fa-stack', size && `fa-${size}x`, className)}>
        {children}
      </span>
    );
  }
}

export default class Icon extends BaseComponent {
  render() {
    const { id, size, stacked, className } = this.props;
    return <span className={classNames('icon', `ion-${id}`, size && `fa-${stacked ? 'stack-' : ''}${size}x`, className)}></span>;
  }
}

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  stacked: PropTypes.bool,
};

