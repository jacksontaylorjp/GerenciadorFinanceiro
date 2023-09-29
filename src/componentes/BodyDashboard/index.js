import { Grid, Paper} from "@mui/material";
import Chart from "componentes/Chart";

const BodyDashboard = () => {
    return (
        <Grid container spacing={2}>

            {/*grid para gráfico anual receitas x despesas */}
            <Grid item xs={12} md={0} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                    }}
                    elevation={2}
                >
                    {/* gráfico */}
                    <Chart/>
                </Paper>
            </Grid>

        </Grid>
    );
}

export default BodyDashboard;