import _ from 'lodash';
import React from 'react';
import { Col, Grid, Label, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import utils from 'keystone-utils';

import { requireAuth } from '../utils/AuthUtils';
import BaseComponent from '../utils/BaseComponent';
import locals from '../utils/locals';
import router from '../router';
import Steps from '../components/survey/Steps';
import steps from '../constants/Steps';
import SurveyStore from '../stores/SurveyStore';

class ToolPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('_beforeUnload');
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this._beforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this._beforeUnload);
  }

  render() {
    const step = router.getCurrentPathname().substring(1);
    const stepNumber = steps.indexOf(step) + 1;
    const title = this.formatMessage(this.getIntlMessage(`${utils.keyToProperty(step)}.longTitle`));

    return (
      <DocumentTitle title={`${locals.name} - ${title}`}>
        <div>
          <div className='sub-header clearfix visible-md visible-lg'>
            <Grid className='prepend-md-1 append-md-1'>
              <Row>
                <Col md={24}>
                  <Steps currentStep={step} className='text-inverse' />
                </Col>
              </Row>
            </Grid>
          </div>

          <div className='survey'>
            <div className='survey__header'>
              <Grid className='prepend-xs-1 append-xs-1'>
                <Row>
                  <Col md={24}>
                    <h3 className='text-primary prepend-xs-none append-xs-none'>
                      <Label bsStyle='primary' className='pull-left'>{stepNumber}/{steps.length}</Label>
                      &nbsp;&nbsp;
                      {title}
                    </h3>
                  </Col>
                </Row>
              </Grid>
            </div>
            <RouteHandler {...this.props}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  _beforeUnload(e) {
    if (SurveyStore.isDirty()) {
      const confirmationMessage = this.formatMessage(this.getIntlMessage('shared.beforeUnload.message'));
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }
}

export default requireAuth(ToolPage);
