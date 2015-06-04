export const tooltip = {
  borderRadius: 5,
  borderWidth: 2,
  shadow: false,
  useHTML: true,
};

export const options3d = {
  enabled: true,
  alpha: 60,
};

export const pie = {
  depth: 30,
  dataLabels: { enabled: false },
  innerSize: 130,
  size: 220,
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
  },
};
