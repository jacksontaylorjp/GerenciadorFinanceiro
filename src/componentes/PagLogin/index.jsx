import {Container, Grid, Typography, Link } from "@mui/material";
import '@fontsource/roboto/400.css';
import FormularioLogin from "../FormularioLogin";
const PagLogin = () => {
    return(
        <Container 
            maxWidth="xm"
            sx={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                typography: 'body1',
            }}
        >
            <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="center"
            >
                <img src="https://cdn-icons-png.flaticon.com/128/871/871589.png"></img>
                <Typography 
                    variant="h4"
                    component="h1"
                >
                    Faça seu login
                </Typography>
                <FormularioLogin />
                <Link 
                    href="#"
                    marginTop={1}
                >
                    {'Esqueceu a sua senha?'}
                </Link>
            </Grid>
        </Container>

    );
}

export default PagLogin;