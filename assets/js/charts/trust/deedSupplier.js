import _ from 'lodash';

import { pie } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Trust Deed Supplier',
      useHTML: true,
    },
  }),
  series: {
    siq: [{
      animation: false,
      name: '% of total',
      data: [
        ['Freehils', 8.66],
        ['Kelly & Co', 0.03],
        ['Madgwicks', 79.2],
        ['OtherA', 12.08],
      ],
    }],
  }
};
