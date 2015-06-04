import _ from 'lodash';
import React from 'react';

import { pie } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Gender',
      useHTML: true,
    },
  }),
  series: {
    siq: [{
      animation: false,
      name: '% of total',
      data: [
        [ 'Male', 52.75 ],
        [ 'Female', 47.26 ],
      ],
    }],
    ato: [{
      animation: false,
      name: '% of total',
      data: [
        [ 'Male', 52.80 ],
        [ 'Female', 47.20 ],
      ],
    }],
  }
};
