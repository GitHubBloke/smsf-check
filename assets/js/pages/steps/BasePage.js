import _ from 'lodash';
import Immutable from 'immutable';
import moment from 'moment';
import React from 'react';
import Highcharts from 'react-highcharts/3d';

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

  questionProps(path) {
    let advice, options;

    try { advice = this.formatMessage(this.getIntlMessage(`${path}.advice`)); } catch(e) {}
    try { options = this.translatedOptions(`${path}.options`); } catch(e) {}

    return {
      label: this.formatMessage(this.getIntlMessage(`${path}.label`)),
      valueLink: this.linkState(`survey.${path}`),
      disabled: this.props.submitting,
      advice,
      options,
      ...this.getErrorProps(`survey.${path}`),
    };
  }
}

BasePage.propTypes = {};
BasePage.defaultProps = {};
