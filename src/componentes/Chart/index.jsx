import * as React from 'react';
import ReactApexChart from 'react-apexcharts';



var state = {

  series: [{
    name: 'Receitas',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 22, 54, 88],
    // color: "#228B22"
  }, {
    name: 'Despesas',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 11, 100],
    // color: "#FF0000"
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '80%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yaxis: {
      title: {
        text: 'R$'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "R$ " + val
        }
      }
    }
  },


};



const Chart = () => {
  return (
      <ReactApexChart options={state.options} series={state.series} type="bar" height={280} />
  );
}


export default Chart;
