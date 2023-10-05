import * as React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography } from "antd";
import { Grid, Paper } from "@mui/material";


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
  const { Title } = Typography;
  return (
    <Grid item xs={12} md={0} lg={12}>
      <Title level={3}>Receitas X Despesas</Title>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 300,
        }}
        elevation={2}
      >
        <ReactApexChart options={state.options} series={state.series} type="bar" height={280} />
      </Paper>
    </Grid>
  );
}


export default Chart;
