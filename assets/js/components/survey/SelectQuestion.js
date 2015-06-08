import _ from 'lodash';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select/lib/Select';

import AdviceBubble from './AdviceBubble';
import BaseComponent from '../../utils/BaseComponent';

export default class SelectQuestion extends BaseComponent {
  render() {
    const { label, bsStyle, help, valueLink, advice, options } = this.props;

    return (
      <div>
        <h3 className='prepend-xs-none append-xs-1'>{label}</h3>
        <Row>
          <Col xs={12}>
            <div className={classNames('form-group', (bsStyle === 'error') && 'has-error')}>
              <Select name={label} {...this.props} options={options} className='Select--lg'
                value={valueLink.value} onChange={valueLink.requestChange} />
              {help && <span className='help-block' dangerouslySetInnerHTML={{ __html: help }}></span>}
            </div>
          </Col>
        </Row>
        {advice && valueLink.value && <AdviceBubble advice={advice} />}
      </div>
    );
  }
}

SelectQuestion.propTypes = {
  options: PropTypes.array.isRequired,
};

