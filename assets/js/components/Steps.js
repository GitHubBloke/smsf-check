import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link } from 'react-router';
import utils from 'keystone-utils';

import BaseComponent from '../utils/BaseComponent';
import steps from '../constants/Steps';

export default class Steps extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderStep');
  }

  render() {
    const { className } = this.props;

    return (
      <ul className={classNames('steps', className)}>
        {_.map(steps, this.renderStep)}
      </ul>
    );
  }

  renderStep(step, index) {
    const { currentStep } = this.props;
    const currentIndex = steps.indexOf(currentStep);
    const title = this.formatMessage(this.getIntlMessage(`${utils.keyToProperty(step)}.title`));

    return (
      <li key={step} className={classNames('steps__step', 'small', (index === currentIndex) && 'active', (index < currentIndex) && 'visited')}>
        <Link to={step}>
          <FM message={title} />
        </Link>
      </li>
    );
  }
}

Steps.propTypes = {
  currentStep: PropTypes.oneOf(steps),
  className: PropTypes.string,
};

