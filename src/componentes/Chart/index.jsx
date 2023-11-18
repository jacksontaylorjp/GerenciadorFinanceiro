import * as React from 'react';
import ReactApexChart from 'react-apexcharts';
import { DatePicker } from "antd";
import { Grid, Paper } from "@mui/material";
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useContext } from 'react';
import { RefreshChartContext } from 'context/RefreshChartContext';
import { StatusModalContext } from 'context/StatusModalContext';


const Chart = () => {
  //usando o status do modal para atualizar o gráfico
  const { openModal } = useContext(StatusModalContext);

  const { refreshChart, dataPMonthReceita, dataPMonthDespesa } = useContext(RefreshChartContext);
  // iniciando o gráfico com os dados do ano atual
  useEffect(() => {
    refreshChart(dayjs, dayjs().$y)
    // atualizando o chart toda vez que o modal é aberto ou fechado
  }, [openModal]);

  var state = {
    series: [{
      name: 'Receitas',
      data: dataPMonthReceita,
      color: "#228B22"
    }, {
      name: 'Despesas',
      data: dataPMonthDespesa,
      color: "#FF0000"
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
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      },
      yaxis: {
        title: {
          text: 'R$'
        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: 'Anual: Receita x Despesa',
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "R$ " + val + ",00";
          }
        }
      }
    },
  };


  return (
    <Grid item xs={12} md={0} lg={12}>
      <Paper
        sx={{
          p: 1,
          mb: 0.15,
          display: 'flex',
          flexDirection: 'column',
          width:100,
          // height: 300,
        }}
        elevation={3}
      >
        <DatePicker
          //para obter o dayjs foi usado o import
          defaultValue={dayjs}
          onChange={refreshChart}
          picker="year"
          placeholder='Selecione o ano para gerar o gráfico'
          size='middle'
        />
      </Paper>
      <Paper
        sx={{
          p: 1,
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
