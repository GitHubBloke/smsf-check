import _ from 'lodash';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Investment Strategy Age',
      useHTML: true,
    },

    xAxis: {
      categories: [
        2003,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: {},
  },

  getActiveDataset(source, member, survey) {
    const dataset = data.series[source];

    if (member) {
      return null;
    } else if (survey) {
      const fundBalance = _.sum(survey.get('members').toJS(), (member) => parseFloat(member.currentMemberBalance));
      return findGroup(fundBalance, dataset) || dataset['All'];
    }

    return dataset['All'];
  },
};

export default data;
