import "./FormularioLogin.css"
import CampoTexto from "../CampoTexto";
import Botao from "../Botao";
const FormularioLogin = () => {
    return(
        <div className="containerFormLogin">
            <img src="https://cdn-icons-png.flaticon.com/128/871/871589.png" alt="Logo"/>
            <h1>Login</h1>
            <form>
                <CampoTexto label="Email"/>
                <CampoTexto label="Senha"/>
                <Botao label="Entrar"/>
            </form>          
        </div>
    );
}

export default FormularioLogin;