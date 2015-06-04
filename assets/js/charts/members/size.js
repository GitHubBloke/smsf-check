import _ from 'lodash';

import { tooltip, options3d, pie } from '../base';

const common = {
  chart: {
    type: 'pie',
    options3d: { ...options3d },
  },
  title: {
    text: 'Member Size',
    useHTML: true,
  },
  tooltip: { ...tooltip },
  plotOptions: { pie: { ...pie } },
};

export const siq = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      ['1 Member', 22.64],
      ['2 Members', 71.13],
      ['3 Members', 3.16],
      ['4 Members', 3.07],
    ],
  }],
});

export const ato = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      ['1 Member', 22.60],
      ['2 Members', 69.50],
      ['3 Members', 3.90],
      ['4 Members', 4.10],
    ],
  }],
});
