import _ from 'lodash';

import { tooltip, options3d, pie } from '../base';

const common = {
  chart: {
    type: 'pie',
    options3d: { ...options3d },
  },
  title: {
    text: 'Member Gender',
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
      [ 'Male', 52.75 ],
      [ 'Female', 47.26 ],
    ],
  }],
});

export const ato = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      [ 'Male', 52.80 ],
      [ 'Female', 47.20 ],
    ],
  }],
});
