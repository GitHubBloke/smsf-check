import _ from 'lodash';
import React from 'react';

import { pie } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Size',
      useHTML: true,
    },
  }),
  series: {
    siq: [{
      animation: false,
      name: '% of total',
      data: [
        ['1 Member', 22.64],
        ['2 Members', 71.13],
        ['3 Members', 3.16],
        ['4 Members', 3.07],
      ],
    }],
    ato: [{
      animation: false,
      name: '% of total',
      data: [
        ['1 Member', 22.60],
        ['2 Members', 69.50],
        ['3 Members', 3.90],
        ['4 Members', 4.10],
      ],
    }],
  }
};
