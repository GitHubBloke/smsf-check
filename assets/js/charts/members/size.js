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
    text: 'Member Size',
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
