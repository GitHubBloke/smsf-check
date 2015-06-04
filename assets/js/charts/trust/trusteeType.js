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
    text: 'Trustee Type',
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
      ['Individuals as Trustee', 54.02],
      ['Corporate Trustee', 45.99],
    ],
  }],
});

export const ato = _.assign({}, common, {
  series: [{
    animation: false,
    name: '% of total',
    data: [
      ['Individuals as Trustee', 76.94],
      ['Corporate Trustee', 23.06],
    ],
  }],
});
