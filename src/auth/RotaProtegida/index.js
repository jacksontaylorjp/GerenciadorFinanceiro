import { CircularProgress } from "@mui/material";
import { auth2 } from "auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RotaProtegida = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasUser, setHasUser] = useState(false);
    async function isUserAuthenticated() {
        const token = sessionStorage.getItem("token");
        //ATENÇÃO
        //verificar se tem token no session storage
        if (!token) {
            return false;
        }
        //verificar se é válido e se está expirado
        const checkAuth = await auth2.check();
        if (!checkAuth) {
            sessionStorage.removeItem("token");

            return false;
        }
        return true;
    }
    useEffect(() => {
        isUserAuthenticated().then((res) => {
            console.log(res);
            setHasUser(res);
            setIsLoading(false);
        })
    }, [])

    return isLoading ? <CircularProgress  
        size={400} 
        sx={{
            display:"flex",  alignItems: 'center',
            justifyContent: 'center'}}
            /> : (
        //se o isUserAuthenticated = true então o outlet estará funcionando e a rota que esta dentro da principal será chamada, caso contrario será redirecionado para login
        hasUser ? <Outlet /> : <Navigate to="/login" />
    );
}

export default RotaProtegida;