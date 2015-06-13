import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import { Col, Grid, Modal, OverlayMixin, Row } from 'react-bootstrap';
import reactMixin from 'react-mixin';

import BaseComponent from '../../utils/BaseComponent';
import Icon from '../../components/Icon';

export default class AdviceBubble extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_toggleModal');
    this.state = { data: Immutable.fromJS({ isModalOpen: false }) };
  }

  render() {
    const { advice } = this.props;

    return (
      <a onClick={this._toggleModal} className='bubble'>
        <Icon id='help-circled' size='lg' className='text-primary' />
        &nbsp;&nbsp;
        {advice}
      </a>
    );
  }

  renderOverlay() {
    const { data } = this.state;
    const { advice } = this.props;

    if (!data.get('isModalOpen')) { return <span/>; }

    return (
      <Modal bsSize='medium' onRequestHide={this._toggleModal}>
        <div className='modal-body text-center'>
          <Grid fluid>
            <Row>
              <Col md={20} mdOffset={2}>
                <h3 className='text-primary append-xs-2'>{advice}</h3>
                <div className='append-xs-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed diam consequat,
                  pharetra tellus in, sagittis dui. Ut scelerisque mauris at lacus condimentum porttitor.
                  Pellentesque varius maximus orci. Mauris cursus pulvinar arcu. Suspendisse lacinia
                  mauris id nibh condimentum semper. Mauris posuere in turpis vitae porta. Nam euismod
                  pharetra lacus, nec consectetur diam convallis convallis.
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

AdviceBubble.propTypes = { advice: PropTypes.string.isRequired };

reactMixin.onClass(AdviceBubble, OverlayMixin);
