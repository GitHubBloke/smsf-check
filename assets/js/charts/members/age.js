import _ from 'lodash';

const common = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 60,
    },
  },
  title: {
    text: 'Member Age',
    useHTML: true,
  },
  plotOptions: {
    pie: {
      depth: 30,
      dataLabels: {
        enabled: false
      },
      innerSize: 130,
      size: 220,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
      },
    },
  },
};

export const siq = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      [ '< 25', 0.75 ],
      [ '25 - 34', 2.00 ],
      [ '35 - 44', 8.35 ],
      [ '45 - 54', 20.88 ],
      [ '55 - 64', 29.27 ],
      [ '> 64', 38.78 ],
    ],
  }],
});

export const ato = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      [ '< 25', 1.30 ],
      [ '25 - 34', 4.10 ],
      [ '35 - 44', 12.90 ],
      [ '45 - 54', 24 ],
      [ '55 - 64', 32.10 ],
      [ '> 64', 25.70 ],
    ],
  }],
});
