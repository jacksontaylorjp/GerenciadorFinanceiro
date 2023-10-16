import { Grid} from "@mui/material";
import Chart from "componentes/Chart";

const BodyDashboard = () => {
    return (
        <Grid container spacing={4}>
            {/* gráfico receita x despesa */}
            <Chart />
        </Grid >
    );
}

export default BodyDashboard;