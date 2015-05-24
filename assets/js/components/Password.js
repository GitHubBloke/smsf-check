import _ from 'lodash';
import classNames from 'classnames';
import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';

import BaseComponent from '../utils/BaseComponent';

export default class Password extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { data: Immutable.fromJS({}) };
  }

  componentWillReceiveProps(props) {
    const { valueLink, value } = props;
    this._setState('strength', this._getStrength(valueLink ? valueLink.value : value));
  }

  render() {
    const { data } = this.state;
    const { bsStyle, className, help } = this.props;

    return (
      <div className={classNames('form-group', (bsStyle === 'error') && 'has-error')}>
        <input type='password' {...this.props} className={classNames(className, 'form-control')} />
        {this.renderStrength()}
        {help && <span className='help-block' dangerouslySetInnerHTML={{ __html: help }}></span>}
      </div>
    );
  }

  renderStrength() {
    const { data } = this.state;

    const strength = data.get('strength');
    if (strength === 0) { return; }

    const style = [void 0, 'danger', 'danger', 'warning', 'warning', 'success' ][strength];
    const level = [void 0, 'Weak', 'Poor', 'Average', 'Good', 'Strong' ][strength];

    return (
      <div className={classNames('password-bar', `password-bar--${style}`, 'append-xs-tiny')}>
        {_.times(strength + 1, (index) => { return this.renderBar(true, index); })}
        {_.times(6 - (strength + 1), (index) => { return this.renderBar(false, index); })}
      </div>
    );
  }

  renderBar(active, index) {
    return <Col className={classNames('password-bar__section', active && 'active', 'prepend-xs-tiny')} key={index} xs={4}></Col>;
  }

  _getStrength(password) {
    const levels = [
      /^(?=.{8,16}).*$/g,
      /^(?=.*[A-Z]).*$/g,
      /^(?=.*[a-z]).*$/g,
      /^(?=.*[0-9]).*$/g,
      /^(?=.*\W).*$/g,
    ];

    return _.reduce(levels, (score, regex) => {
      score += (regex.test(password) ? 1 : 0);
      return score;
    }, 0);
  }
}

Password.propTypes = {
  bsStyle: PropTypes.oneOf([ 'error' ]),
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  valueLink: PropTypes.shape({ value: PropTypes.any, requestChange: PropTypes.func  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
