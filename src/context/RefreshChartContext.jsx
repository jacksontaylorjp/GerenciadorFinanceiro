import { data } from 'data';
import { createContext } from 'react';
import { useState } from 'react';

export const RefreshChartContext = createContext();

export const RefreshChartProvider = ({children}) => {
    const [dataPMonthReceita, setDataPMonthReceita] = useState();
    const [dataPMonthDespesa, setDataPMonthDespesa] = useState();
  
    async function refreshChart(date, dateString){
      const dataReceita = await data.getDataReceitaPMouth(dateString);
      const valoresNumericosReceita = dataReceita.map(obj => parseFloat(obj.valor_total_mensal));
      setDataPMonthReceita(valoresNumericosReceita);
  
      const dataDespesa = await data.getDataDespesaPMouth(dateString);
      const valoresNumericosDespesa = dataDespesa.map(obj => parseFloat(obj.valor_total_mensal));
      setDataPMonthDespesa(valoresNumericosDespesa);
  
    };

    return(
        <RefreshChartContext.Provider value={{refreshChart, dataPMonthReceita, dataPMonthDespesa}}>
            {children}
        </RefreshChartContext.Provider>
    )
}
