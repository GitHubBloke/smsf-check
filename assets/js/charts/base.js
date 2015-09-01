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
        pointFormat: '<b>{point.y}</b>',
      },
    },
  },
  legend: {
    enabled: false,
  },
};

export function csvToSeries(csv, isColumn) {
  const series = {};

  _.each(csv, (line) => {
    _.each(_.omit(line, 'label'), (value, group) => {
      series[group] = series[group] || [{
        animation: false, name: '% of total',
        data: [],
      }];

      series[group][0].data.push(isColumn ? parseFloat(value) : { name: line.label, y: parseFloat(value) });
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
