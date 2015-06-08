import _ from 'lodash';
import Immutable from 'immutable';
import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Highcharts from 'react-highcharts/3d';

import AdviceBubble from '../../components/survey/AdviceBubble';
import RadioQuestion from '../../components/survey/RadioQuestion';
import SelectQuestion from '../../components/survey/SelectQuestion';
import SurveyActionCreators from '../../actions/SurveyActionCreators';
import SurveyStore from '../../stores/SurveyStore';
import Validatable from '../../utils/Validatable';

export default class BasePage extends Validatable {
  constructor(props) {
    super(props);
    this.bind('validate');
    this.state = {
      data: Immutable.fromJS({ survey: props.survey }),
    };
  }

  componentDidMount() {
    SurveyActionCreators.addValidator(this.validate);
  }

  componentWillUnmount() {
    SurveyActionCreators.removeValidator(this.validate);
  }

  componentWillReceiveProps(nextProps) {
    this.state.data.set('survey', nextProps.survey);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSurvey = prevState.data.get('survey');
    const survey = this.state.data.get('survey');
    if (prevSurvey !== survey) {
      SurveyActionCreators.makeDirty(survey);
    }
  }

  renderChart(chart, { activeDataSet, comparisonMode, comparisonMember }) {
    const data = chart.series[activeDataSet];

    let group = 'All';

    if (comparisonMode === 'member' && comparisonMember) {
      const age = moment().diff(moment(comparisonMember.get('dateOfBirth'), 'DD / MM / YYYY'), 'years');
      _.each([ 25, 35, 45, 55, 65, Infinity ], (ageTopRange) => {
        if (age < ageTopRange) {
          group = ageTopRange.toString();
          return false;
        }
      });
    }

    return data && data[group] &&
      <Highcharts key={chart.config.title.text}
        config={chart.config}
        series={_.cloneDeep(data[group])} />;
  }

  renderRadioQuestion(messagePath, dataPath, hasAdvice) {
    const { data } = this.state;
    const { submitting } = this.props;

    const radioData = {
      question: this.formatMessage(this.getIntlMessage(`${messagePath}.question`)),
      options: this.translatedOptions(`${messagePath}.options`),
      valueLink: this.valueLink(dataPath),
      disabled: submitting,
      error: this.getErrorProps(dataPath).help,
    };

    return (
      <Row>
        <Col xs={24}>
          <RadioQuestion {...radioData}></RadioQuestion>
          {hasAdvice && data.getIn(dataPath.split('.')) &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage(`${messagePath}.advice`))} />}
        </Col>
      </Row>
    );
  }

  renderSelectQuestion(messagePath, dataPath, hasAdvice) {
    const { data } = this.state;
    const { submitting } = this.props;

    const selectData = {
      question: this.formatMessage(this.getIntlMessage(`${messagePath}.question`)),
      options: this.translatedOptions(`${messagePath}.options`),
      valueLink: this.valueLink(dataPath),
      disabled: submitting,
      error: this.getErrorProps(dataPath).help,
    };

    return (
      <Row>
        <Col xs={24}>
          <SelectQuestion {...selectData}></SelectQuestion>
          {hasAdvice && data.getIn(dataPath.split('.')) &&
            <AdviceBubble advice={this.formatMessage(this.getIntlMessage(`${messagePath}.advice`))} />}
        </Col>
      </Row>
    );
  }
}

BasePage.propTypes = {};
BasePage.defaultProps = {};
