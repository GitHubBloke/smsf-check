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
      innerSize: 130,
      size: 220,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
      },
    }
  },
};
