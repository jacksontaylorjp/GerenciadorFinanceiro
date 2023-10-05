import { Grid, Paper } from "@mui/material";
import { Col, Row, Typography } from "antd";
import Chart from "componentes/Chart";
import TableLatestMov from "componentes/TableLatestMov";

const BodyDashboard = () => {
    const { Title } = Typography;

    return (
        <Grid container spacing={4}>

            {/* gráfico receita x despesa */}
            <Chart />

            <Grid item xs={12} md={0} lg={12}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col>
                        <Title level={3}>Ultimas movimentações</Title>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                // height: 300,
                            }}
                            elevation={2}
                        >
                            {/* ultimas movimentações */}
                            <TableLatestMov />
                        </Paper>
                    </Col>
                    <Col>
                        <Title level={3}>teste</Title>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                // height: 300,
                            }}
                            elevation={2}
                        >
                            {/* ultimas movimentações */}
                            <TableLatestMov />
                        </Paper>
                    </Col>
                </Row>
            </Grid>

        </Grid >
    );
}

export default BodyDashboard;