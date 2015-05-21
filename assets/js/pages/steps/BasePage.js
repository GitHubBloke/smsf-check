import Immutable, { Map } from 'immutable';
import React, { PropTypes } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BaseComponent from '../../utils/BaseComponent';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';

export default class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_handleSubmit', '_skip');
    this.state = { data: Immutable.fromJS({}) };
  }

  componentDidUpdate() {
    const survey = SurveyStore.getDirtySurvey();
    const dirtySurvey = this.props.survey;
    if (dirtySurvey && survey !== dirtySurvey) {
      SurveyActionCreators.makeDirty(dirtySurvey);
    }
  }

  render() {
    const { survey, submitting } = this.props;

    return (
      <form noValidate autoComplete='off' onSubmit={this._handleSubmit}>
        <Grid className='prepend-xs-2 append-xs-2'>
          <Row>
            <Col md={16}>
              {this.props.renderForm()}

              <hr />

              <div className='pull-right'>
                <Button bsSize='large' bsStyle='link' className='link-plain' onClick={this._skip}>
                  <small className='text-muted'>Skip this step</small>
                </Button>
                <Button bsSize='large' bsStyle='primary' type='submit'
                  disabled={submitting}>
                  <FM message={this.getIntlMessage(`shared.actions.nextStep.${submitting ? 'loadingLabel' : 'actionLabel'}`)} />
                </Button>
              </div>
            </Col>
            <Col md={8}>
              {this.props.renderChart()}
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }

  renderForm() {
    return <div></div>;
  }

  _handleSubmit(e) {
    SurveyActionCreators.save();
    e.preventDefault();
  }

  _skip() {
  }
}

BasePage.propTypes = { survey: PropTypes.instanceOf(Map) };
BasePage.defaultProps = {};
