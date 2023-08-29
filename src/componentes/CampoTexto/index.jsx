import "./CampoTexto.css"
const CampoTexto = ({label}) => {
    return (
        <div className="campo-texto">
            <label>{label}</label>
            <input type="text" />
        </div>
    )
}

export default CampoTexto;