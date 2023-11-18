import { Grid } from "@mui/material";
import Balanco from "componentes/Balanco";
import Chart from "componentes/Chart";
import TableRD from "componentes/TableRD";

const BodyDashboard = () => {
    return (
        <Grid container spacing={4}>
            {/* gráfico receita x despesa */}
            {/* <Balanco /> */}
            <Chart />
            <TableRD />
        </Grid >
    );
}

export default BodyDashboard;