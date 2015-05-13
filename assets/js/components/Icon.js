import classNames from 'classnames';
import React, { PropTypes } from 'react';

import BaseComponent from '../utils/BaseComponent';

export default class Icon extends BaseComponent {
  render() {
    const { id, className } = this.props;
    return <span className={classNames('icon', `ion-${id}`, className)}></span>;
  }
}

Icon.propTypes = { id: PropTypes.string.isRequired };

