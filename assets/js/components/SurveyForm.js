import Immutable, { Map } from 'immutable';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../shims/ReactIntl';
import { Link } from 'react-router';

import BaseComponent from '../utils/BaseComponent';
import Icon from './Icon';
import SurveyActionCreators from '../actions/SurveyActionCreators';

export default class SurveyForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit');
    this.state = { data: Immutable.fromJS({}) };
  }

  render() {
    return (
      <form className='survey' noValidate autoComplete='off' onSubmit={this._handleSubmit}>
        <Grid className='prepend-xs-3 append-xs-2'>
          <Row>
            <Col md={16}>
              {this.props.renderForm()}
              <hr className='prepend-xs-tiny append-xs-tiny' />
              {this.renderActions()}
            </Col>
            <Col md={8}>
              {this.props.renderChart()}
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }

  renderActions() {
    const { skippable, submitting, prevRoute, nextRoute } = this.props;

    return (
      <ul className='list-inline pull-right prepend-xs-1'>
        {skippable && nextRoute &&
          <li>
            <Link className='btn btn-link btn-lg link-plain' to={nextRoute}>
              <small><FM message={this.getIntlMessage('shared.actions.skipStep.actionLabel')} /></small>
            </Link>
          </li>}

        {prevRoute &&
          <li>
            <Link to={prevRoute} className='btn btn-primary btn-lg'
              disabled={submitting}>
              <Icon id='android-arrow-back' size='lg' />
              &nbsp;&nbsp;
              <FM message={this.getIntlMessage('shared.actions.prevStep.actionLabel')} />
            </Link>
          </li>}

        {nextRoute &&
          <li>
            <Button bsSize='large' bsStyle='primary' type='submit'
              disabled={submitting}>
              <FM message={this.getIntlMessage(`shared.actions.nextStep.${submitting ? 'loadingLabel' : 'actionLabel'}`)} />
              &nbsp;&nbsp;
              <Icon id='android-arrow-forward' size='lg' />
            </Button>
          </li>}
      </ul>
    );
  }

  _handleSubmit(e) {
    const { nextRoute } = this.props;

    SurveyActionCreators.saveAndTransitionTo(nextRoute);
    e.preventDefault();
  }
}

SurveyForm.propTypes = {
  survey: PropTypes.instanceOf(Map),
  submitting: PropTypes.bool.isRequired,
  skippable: PropTypes.bool.isRequired,
  prevRoute: PropTypes.string,
  nextRoute: PropTypes.string,
};

SurveyForm.defaultProps = {};
