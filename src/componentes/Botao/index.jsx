import "./Botao.css"
const Botao = ({label}) => {
    return (
        <button 
            className="botao"
        >
            {label}
        </button>

    )
}

export default Botao;