import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Death Benefit Nomination Year',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '% of Members With Ac Based Pension',
        '% of Members With TTR Pension',
        '% of Members with Other Pensions',
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: {},
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
