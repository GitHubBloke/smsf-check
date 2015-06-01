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
    text: 'Member Gender',
    useHTML: true,
    verticalAlign: 'bottom',
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
      ['Male', 52.75],
      ['Female', 47.26],
    ],
  }],
});

export const ato = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      ['Male', 52.80],
      ['Female', 47.20],
    ],
  }],
});
