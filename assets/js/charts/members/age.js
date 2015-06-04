import _ from 'lodash';

import { pie } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Age',
      useHTML: true,
    },
  }),
  series: {
    siq: [{
      animation: false,
      name: '% of total',
      data: [
        [ '25 - 34', 2.00 ],
        [ '35 - 44', 8.35 ],
        [ '45 - 54', 20.88 ],
        [ '55 - 64', 29.27 ],
        [ '> 64', 38.78 ],
        [ '< 25', 0.75 ],
      ],
    }],
    ato: [{
      animation: false,
      name: '% of total',
      data: [
        [ '25 - 34', 4.10 ],
        [ '35 - 44', 12.90 ],
        [ '45 - 54', 24 ],
        [ '55 - 64', 32.10 ],
        [ '> 64', 25.70 ],
        [ '< 25', 1.30 ],
      ],
    }],
  }
};
