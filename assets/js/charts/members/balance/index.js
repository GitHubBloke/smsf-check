import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Member Balance',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '$50k - $99k',
        '$100k - $149k',
        '$150k - $199k',
        '$200k - $499k',
        '$500k - $1M',
        '$1M - $2M',
        '$2M - $4M',
        '$5M - $9M',
        '$10M+',
      ],
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: '',
      }
    },

    legend: {
      enabled: false,
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: csvToSeries(require('./ato.csv'), true),
  },

  getActiveDataset(source, member) {
    const dataset = data.series[source];

    if (member) {
      const age = moment().diff(moment(member.get('dateOfBirth'), 'DD / MM / YYYY'), 'years');
      return findGroup(age, dataset);
    } else {
      return dataset['All'];
    }
  },
};

export default data;
