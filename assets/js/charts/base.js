import _ from 'lodash';

export const pie = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 60,
    },
  },
  title: {
    useHTML: true,
  },
  tooltip: {
    borderRadius: 5,
    borderWidth: 2,
    shadow: false,
    useHTML: true,
  },
  plotOptions: {
    pie: {
      depth: 30,
      dataLabels: { enabled: false },
      showInLegend: true,
      innerSize: 130,
      size: 220,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
      },
    },
  },
  legend: {
    itemMarginBottom: 5,
    itemStyle: { color: '#666666', fontWeight: 'normal' },
  },
};

export const column = {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      viewDistance: 25,
      depth: 40
    },
  },
  title: {
    useHTML: true,
  },
  tooltip: {
    borderRadius: 5,
    borderWidth: 2,
    shadow: false,
    useHTML: true,
  },
  plotOptions: {
    column: {
      depth: 40,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f}%</b>',
      },
    },
  },
  legend: {
    enabled: false,
  },
};

export function csvToSeries(csv, isColumn) {
  const series = {};
  const groups = _.keys(_.omit(csv[0], 'label', ''));
  const totals = _.reduce(groups, (memo, group) => {
    memo[group] = _.sum(csv, (line) => line[group]);
    return memo;
  }, {});

  _.each(csv, (line) => {
    const dataLine = _.omit(line, 'label', '');
    _.each(dataLine, (value, group) => {
      series[group] = series[group] || [{
        animation: false, name: '% of total',
        data: [],
      }];

      const total = totals[group];
      const percentValue = parseFloat(((parseFloat(value) / total) * 100).toFixed(2));
      series[group][0].data.push(isColumn ? percentValue : { name: line.label, y: percentValue });
    });
  });

  return series;
}

export function findGroup(value, groups) {
  let result;

  const digitise = (value) => parseInt(value.replace(/[^0-9]/g, ''));

  _.each(groups, (data, rangeLabel) => {
    if (rangeLabel.match(/\</)) {
      const rangeValue = digitise(rangeLabel);
      if (value < rangeValue) { result = data; return false; }
    } else if (rangeLabel.match(/\>/)) {
      const rangeValue = digitise(rangeLabel);
      if (value > rangeValue) { result = data; return false; }
    } else {
      const range = rangeLabel.split('-').map((rangeValue) => digitise(rangeValue));
      if (value >= range[0] && value <= range[1]) {
        result = data;
        return false;
      }
    }
  });

  return result;
}
