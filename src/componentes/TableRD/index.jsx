import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { CircularProgress, Grid, LinearProgress, Paper } from "@mui/material";
import { Checkbox, Space, Table, Tag } from "antd";
import { StatusModalContext } from "context/StatusModalContext";
import { data } from "data";
import { useContext, useEffect, useState } from "react";

const TableRD = () => {

    //------------------------------------------------------------------------------
    //usando o status do modal para atualizar o gráfico
    const { openModal } = useContext(StatusModalContext);
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
    const columns = [
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
            title: '',
            key: 'action',
            render: () => (
                <Space size="large">
                    <EditTwoTone style={{ fontSize: '20px' }} />
                    <DeleteTwoTone style={{ fontSize: '20px' }} />
                </Space>
            ),
        },
    ];
    const dataReceita = receita.map((element) => ({
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
                        columns={columns}
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
                        columns={columns}
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