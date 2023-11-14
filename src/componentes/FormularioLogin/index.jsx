import { Button, TextField } from "@mui/material";
import { auth2 } from '../../auth';
import { useState } from "react";

const FormularioLogin = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [auth, setAuth] = useState({ email: "admin@admin.com", password: "12345678" });

    async function handlerSubmit() {
        //se não tiver error no formulário é solicitado ao backend a verificação dos dados
        //como foi utilizado o onBlur se não tratar os campos vazio a solicitação é enviada
        //para o backend, pois inicialmente o useState é true.
        if (auth.email !== "" && auth.password !== "" && error.email.valid && error.password.valid) {
            auth2.login(auth.email, auth.password);
        }
        if (auth.email === "") {
            setError((prevError) => ({
                ...prevError,
                email: { valid: false, msg: "*Campo obrigatório" }
            }))
        }
        if (auth.password === "") {
            setError((prevError) => ({
                ...prevError,
                password: { valid: false, msg: "*Campo obrigatório" }
            }))
        }
    }
    const [error, setError] = useState({
        email: { valid: true, msg: "" },
        password: { valid: true, msg: "" }
    });


    function handleErrorEmail() {
        const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!(regexEmail.test(auth.email))) {
            setError((prevError) => ({
                ...prevError,
                email: { valid: false, msg: "Informe um email válido." }
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                email: { valid: true, msg: "" }
            }));
        }
    }

    function handleErrorPassword() {
        if (auth.password.length < 8) {
            setError((prevError) => ({
                ...prevError,
                password: { valid: false, msg: "Informe uma senha válida. Mínimo de 8 dígitos." }
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                password: { valid: true, msg: "" }
            }));

        }

    }

    function handleChange(e) {
        const newData = { ...auth };
        const value = e.target.value
        const field = e.target.name;
        switch (field) {
            case "email":
                newData.email = value;
                break;
            case "password":
                newData.password = value;

                break;

            default:
                break;
        }
        setAuth(newData);
    }

    return (
        <form onSubmit={event => {
            event.preventDefault();
        }}
        >
            <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                type="email"
                fullWidth
                value={auth.email}
                // onChange={event => setEmail(event.target.value)}
                onChange={event => handleChange(event)}
                onBlur={handleErrorEmail}
                error={!error.email.valid}
                helperText={error.email.msg}
            />
            <TextField
                id="password"
                label="Senha"
                name="password"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
                value={auth.password}
                // onChange={event => setPassword(event.target.value)}
                onChange={event => handleChange(event)}
                onBlur={handleErrorPassword}
                error={!error.password.valid} 
                helperText={error.password.msg}
            />
            <Button
                fullWidth
                variant="contained"
                type="submit"
                //mudar para handlerSubmit
                onClick={handlerSubmit}
            >
                Entrar
            </Button>
        </form>
    );
}


export default FormularioLogin;