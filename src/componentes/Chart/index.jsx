import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'R$',
    },
  ],
//   width: 1024,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -20px)',
    },
  },
};
const dataset = [
  {
    receitas: 59.00,
    despesas: 12.00,
    month: 'Jan',
  },
  {
    receitas: 59.00,
    despesas: 40.00,
    month: 'Fev',
  },
  {
    receitas: 59.00,
    despesas: 5.00,
    month: 'Mar',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Abr',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Mai',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Jun',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Jul',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Ago',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Set',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Out',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Nov',
  },
  {
    receitas: 59.00,
    despesas: 57.00,
    month: 'Dez',
  },
  
];

const valueFormatter = (value) => `R$${value}.00`;

const Chart = () => {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'receitas', label: 'Receitas', valueFormatter },
        { dataKey: 'despesas', label: 'Despesas', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}

export default Chart;
