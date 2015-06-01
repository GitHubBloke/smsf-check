
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
    text: 'Trust Deed Supplier',
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
      ['Freehils', 8.66],
      ['Kelly & Co', 0.03],
      ['Madgwicks', 79.2],
      ['OtherA', 12.08],
    ],
  }],
});
