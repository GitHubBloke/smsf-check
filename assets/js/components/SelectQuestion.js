import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import Select from 'keystone/node_modules/react-select';

import BaseComponent from '../utils/BaseComponent';

export default class SelectQuestion extends BaseComponent {
  render() {
    const { question, valueLink, error } = this.props;

    return (
      <div>
        <h3 className='prepend-xs-none append-xs-1'>{question}</h3>
        <div className={classNames('form-group', error && 'has-error')}>
          <Select name={question} {...this.props} className='Select--lg' {...valueLink} />
          {error && <span className='help-block' dangerouslySetInnerHTML={{ __html: error }}></span>}
        </div>
      </div>
    );
  }
}

SelectQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  valueLink: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

