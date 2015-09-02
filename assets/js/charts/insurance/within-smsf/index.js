import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Insurance Held Within an SMSF',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '% Life Insurance',
        '% Disability Insurance',
        '% Of Salary Insurance',
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
