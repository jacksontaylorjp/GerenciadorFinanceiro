import { Button, TextField } from "@mui/material";
import { auth } from '../../auth';
import { useState } from "react";

const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function checkLogin() {
        //se não tiver error no formulário é solicitado ao backend a verificação dos dados
        //como foi utilizado o onBlur se não tratar os campos vazio a solicitação é enviada
        //para o backend, pois inicialmente o useState é true.
        if (email !== "" && password !== "" && error.email.valid && error.password.valid) {
            auth.validateUser(email, password);
        }
        if (email === "") {
            setError((prevError) => ({
                ...prevError,
                email: { valid: false, msg: "*Campo obrigatório" }
            }))
        }
        if (password === "") {
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
        if (!(regexEmail.test(email))) {
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
        if (password.length < 8) {
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

    return (
            <form onSubmit={event => {
                event.preventDefault();
            }}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onBlur={handleErrorEmail}
                    error={!error.email.valid}
                    helperText={error.email.msg}
                />
                <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    onBlur={handleErrorPassword}
                    error={!error.password.valid}
                    helperText={error.password.msg}
                />
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={checkLogin}
                >
                    Entrar
                </Button>
            </form>
    );
}


export default FormularioLogin;