import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Grid, Paper } from "@mui/material";
import { Checkbox, Col, Row, Space, Table, Tag } from "antd";

const TableRD = () => {
    const columns = [
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
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
            title: 'Tags',//tags = tipo
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
    const data = [
        {
            key: '1',
            tipo: 'John Brown',
            data: 32,
            descricao: 'New York No. 1 Lake Park',
            valor: 123 + ",00",
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            tipo: 'Jim Green',
            data: 42,
            descricao: 'London No. 1 Lake Park',
            valor: 123 + ",00",
            tags: ['loser'],
        },
        {
            key: '3',
            tipo: 'Joe Black',
            data: 32,
            descricao: 'Sydney No. 1 Lake Park',
            valor: 123 + ",00",
            tags: ['cool', 'teacher'],
        },
        {
            key: '4',
            tipo: 'Joe Black',
            data: 32,
            descricao: 'Sydney No. 1 Lake Park',
            valor: 123 + ",00",
            tags: ['cool', 'teacher'],
        },
        {
            key: '5',
            tipo: 'Joe Black',
            data: 32,
            descricao: 'Sydney No. 1 Lake Park',
            valor: 123 + ",00",
            tags: ['cool', 'teacher'],
        },
    ];

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
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
                            dataSource={data}
                            pagination={{
                                position: ["bottomCenter"]
                            }}
                            title={() => "Receitas"}
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
                            dataSource={data}
                            pagination={{
                                position: ["bottomCenter"]
                            }}
                            title={() => "Despesas"}
                            size="small"
                        />
            </Paper>
        </Grid>
        </>
    );
}

export default TableRD;