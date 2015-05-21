import React from 'react';
import { Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import { FormattedMessage as FM } from '../../shims/ReactIntl';

import BaseComponent from '../../utils/BaseComponent';
import BasePage from './BasePage';
import locals from '../../utils/locals';
import { connectToStores } from '../../utils/StoreUtils';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';

class TrustPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.bind('renderForm', 'renderChart');
  }

  render() {
    return (
      <DocumentTitle title={`${locals.name} - ${this.formatMessage(this.getIntlMessage('trust.title'))}`}>
        <BasePage {...this.props}
          renderForm={this.renderForm}
          renderChart={this.renderChart}
          prevRoute='members'>
        </BasePage>
      </DocumentTitle>
    );
  }

  renderForm() {
    const { survey, submitting } = this.props;

    return (
      <div>
        <Row>
        </Row>
      </div>
    );
  }

  renderChart() {
    return <div></div>;
  }
}

TrustPage.propTypes = {};
TrustPage.defaultProps = {};

function pickProps({ params }) {
  return { params };
}

function getState({ params }) {
  const survey = SurveyStore.getDirtySurvey();
  const submitting = SurveyStore.isSaving();
  const skippable = SurveyStore.isSkippable();
  return { survey, submitting, skippable };
}

export default connectToStores(TrustPage,
  [ SurveyStore ],
  pickProps,
  getState
);
