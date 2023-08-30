import { Button, TextField } from "@mui/material";
import { useState } from "react";

const FormularioLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erros, setErros] = useState({email:{valido:true,texto:""}});
    
    //tratando o erro do email
    function erroEmail(){
        if(email.length < 3 ){
            setErros({email:{valido:false, texto: "O email dever ter mais de 3 caracteres"}});
        }else{
            setErros({email:{valido:true, texto: ""}});
        }
    }

    return(
        <form onSubmit={event => {
            event.preventDefault();
            console.log(email);
            console.log(senha);
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
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}

                        error={!erros.email.valido}
                        helperText={erros.email.texto}
                        onBlur={(event) => {erroEmail();}}
                    />
            <TextField 
                        id="senha" 
                        label="Senha" 
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth 
                        value={senha}
                        onChange={(event) => {
                            setSenha(event.target.value);
                        }}
                    />
            <Button
                fullWidth 
                variant="contained"
                type="submit"
            >
                Entrar
            </Button>
        </form>
    );
}

export default FormularioLogin;