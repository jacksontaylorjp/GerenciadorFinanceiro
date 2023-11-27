import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Grid, LinearProgress, Paper } from "@mui/material";
import { Checkbox, Space, Table } from "antd";
import { RefreshChartContext } from "context/RefreshChartContext";
import { StatusModalContext } from "context/StatusModalContext";
import { data } from "controller";
import { useContext, useEffect, useState } from "react";
import dayjs from 'dayjs';

const TableRD = () => {

    //------------------------------------------------------------------------------
    //usando o status do modal para atualizar o gráfico
    const { openModal, toggleModalReceita, setFieldReceita } = useContext(StatusModalContext);
    //usando o refreshChart do context para atualizar o gráfico ao apagar dados da tabela
    const { refreshChart } = useContext(RefreshChartContext);
    const [receita, setReceita] = useState([])
    const [despesa, setDespesa] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const resReceita = await data.getDataReceita();
            setReceita(resReceita);
            const resDespesa = await data.getDataDespesa();
            setDespesa(resDespesa);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [openModal]);
    //------------------------------------------------------------------------------
    const columnsR = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'datavencimento',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Status',
            key: 'status',
            render: () => (
                <Checkbox onChange={onChange}></Checkbox>
            ),
        },
        {
            title: 'Editar',
            key: 'action',
            render: (text, record) => (
                <EditTwoTone
                    style={{ fontSize: '20px' }}
                    onClick={() => { handleEditarR(record) }}
                />
            ),
        },
        {
            title: 'Excluir',
            key: 'action',
            render: (text, record) => (
                <DeleteTwoTone
                    style={{ fontSize: '20px' }}
                    onClick={() => handleExcluirR(record.id)}
                />
            ),
        },
    ];
    const columnsD = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'datavencimento',
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Status',
            key: 'status',
            render: () => (
                <Checkbox onChange={onChange}></Checkbox>
            ),
        },
        {
            title: 'Editar',
            key: 'action',
            render: () => (
                <EditTwoTone
                    style={{ fontSize: '20px' }}
                    onClick={() => { console.log('editar') }}
                />
            ),
        },
        {
            title: 'Excluir',
            key: 'action',
            render: (text, record) => (
                <DeleteTwoTone
                    style={{ fontSize: '20px' }}
                    onClick={() => handleExcluirD(record.id)}
                />
            ),
        },
    ];
    const dataReceita = receita.map((element) => ({
        id: element.id,
        key: element.id,
        tipo: element.tipo,
        data: element.datarecebimento.slice(0, 10),
        descricao: element.descricao,
        valor: element.valor + ",00",
    }));
    //invertendo a ordem dos indeces do array para mostrar na ordem de lançamento
    dataReceita.reverse();
    //como é necessário um array para o component foi usado o map, pois o forEach não retorna um array
    const dataDespesa = despesa.map((element) => ({
        id: element.id,
        key: element.id,
        tipo: element.tipo,
        //usando o slice para mostrar apenas a data
        data: element.datavencimento.slice(0, 10),
        descricao: element.descricao,
        valor: element.valor + ",00",
    }));
    //invertendo a ordem dos indeces do array para mostrar na ordem de lançamento
    dataDespesa.reverse();

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`
        );
    };

    const handleEditarR = (record) => {
        toggleModalReceita()
        console.log(record, 'table');
        setFieldReceita((e) => ({
            ...e,
            id: record.id,
            tipo: record.tipo,
            datarecebimento: record.data,
            descricao: record.descricao,
            valor: parseFloat(record.valor),
          }))
    };

    // para acessar o id, foi necessário colocar no render do botão a prop record. Assim como no onclick passar record.id
    const handleExcluirR = (id) => {
        data.delete_receita(id)
        setRefreshTable(!refreshTable);
    };
    const handleExcluirD = (id) => {
        data.delete_despesa(id)
        setRefreshTable(!refreshTable);
    };
    //usando o estado refreshTable para atualizar a tabela quando for inserido novos dados com o auxilio do useEffect
    const [refreshTable, setRefreshTable] = useState(false);
    useEffect(() => {
        fetchData();
        //esta atualizando apenas se estiver selecionado o gráfico do ano atual, pois foi inserido dayjs, dayjs().$y)
        refreshChart(dayjs, dayjs().$y)
    }, [refreshTable]);
    return isLoading ? <LinearProgress /> : (
        <>
            <Grid item xs>
                <Paper
                    sx={{
                        p: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        // height: 300,
                    }}
                    elevation={2}
                >
                    <Table
                        columns={columnsR}
                        dataSource={dataReceita}
                        pagination={{
                            position: ["bottomCenter"]
                        }}
                        title={() => "Receitas - últimos lançamentos"}
                        size="small"
                    />
                </Paper>
            </Grid>
            {/* xs fica com autolayout */}
            <Grid item xs>
                <Paper
                    sx={{
                        p: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        // height: 300,
                    }}
                    elevation={2}
                >
                    <Table
                        columns={columnsD}
                        dataSource={dataDespesa}
                        pagination={{
                            position: ["bottomCenter"]
                        }}
                        title={() => "Despesas - últimos lançamentos"}
                        size="small"
                    />
                </Paper>
            </Grid>
        </>
    );
}

export default TableRD;