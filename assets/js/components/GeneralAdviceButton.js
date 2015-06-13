import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Modal, OverlayMixin, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import reactMixin from 'react-mixin';

import BaseComponent from '../utils/BaseComponent';

export default class GeneralAdviceButton extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_toggleModal');
    this.state = { data: Immutable.fromJS({ isModalOpen: false }) };
  }

  render() {
    return (
      <Button bsSize='xsmall' bsStyle='primary' onClick={this._toggleModal}>
        <FM message={this.getIntlMessage('shared.adviceDisclaimer.actionLabel')} />
      </Button>
    );
  }

  renderOverlay() {
    const { data } = this.state;

    if (!data.get('isModalOpen')) { return <span/>; }

    return (
      <Modal bsSize='medium' onRequestHide={this._toggleModal}>
        <div className='modal-body text-center'>
          <h3 className='text-primary append-xs-2'>
            <FM message={this.getIntlMessage('shared.adviceDisclaimer.title')} />
          </h3>

          <Grid fluid>
            <Row>
              <Col md={20} mdOffset={2}>
                <div className='append-xs-2'>
                  <FM message={this.getIntlMessage('shared.adviceDisclaimer.text')} />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </Modal>
    );
  }

  _toggleModal() {
    this._setState('isModalOpen', !this.state.data.get('isModalOpen'));
  }
}

reactMixin.onClass(GeneralAdviceButton, OverlayMixin);
