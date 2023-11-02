import * as React from 'react';
import ReactApexChart from 'react-apexcharts';
import { DatePicker } from "antd";
import { Grid, Paper } from "@mui/material";
import { data } from 'data';
import dayjs from 'dayjs';
import { useEffect } from 'react';


const Chart = () => {

  const [dataPMonthReceita, setDataPMonthReceita] = React.useState();
  const [dataPMonthDespesa, setDataPMonthDespesa] = React.useState();

  async function refreshChart(date, dateString){
    const dataReceita = await data.getDataReceitaPMouth(dateString);
    const valoresNumericosReceita = dataReceita.map(obj => parseFloat(obj.valor_total_mensal));
    setDataPMonthReceita(valoresNumericosReceita);

    const dataDespesa = await data.getDataDespesaPMouth(dateString);
    const valoresNumericosDespesa = dataDespesa.map(obj => parseFloat(obj.valor_total_mensal));
    setDataPMonthDespesa(valoresNumericosDespesa);

  };
  // iniciando o gráfico com os dados do ano atual
  useEffect(()=>{
    refreshChart(dayjs,dayjs().$y)
  },[])

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
    <Grid item xs={12} md={0} lg={8}>
      <Paper
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          // height: 300,
        }}
        elevation={2}
      >
        <DatePicker
          //para obter o dayjs foi usado o import
          defaultValue={dayjs}
          onChange={refreshChart}
          picker="year"
          placeholder='Selecione o ano para gerar o gráfico'
          size='middle'
        />
        <ReactApexChart options={state.options} series={state.series} type="bar" height={280} />
      </Paper>
    </Grid>
  );
}


export default Chart;
