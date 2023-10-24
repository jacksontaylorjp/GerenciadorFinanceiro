import { MenuItem, Select, TextField } from '@mui/material';
import { Divider, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { data } from '../../data';
import { StatusModalContext } from 'context/StatusModalContext';

const ModalAddDespesas = ({ titulo}) => {
  const {openModal, toogleModalDespesa} = useContext(StatusModalContext);

  //usando apenas um useState para os campos do formulário
  const [fieldDespesa, setfieldDespesa] = useState({
    tipo: "geral", datavencimento: "", descricao: "", valor: ""
  })

  const [error, setError] = useState({
    datavencimento: { valid: true, msg: "" },
    descricao: { valid: true, msg: "" },
    valor: { valid: true, msg: "" },
  }
  );

  function handlerChange(e) {
    const newData = { ...fieldDespesa }
    const value = e.target.value
    const field = e.target.name

    switch (field) {
      case "tipo":
        newData.tipo = value;
        break;

      case "datavencimento":
        newData.datavencimento = value;
        break;

      case "descricao":
        newData.descricao = value;
        break;

      case "valor":
        newData.valor = value;
        break;

      default:
        break;
    }
    setfieldDespesa(newData);

  }


  function hError(campo, campoError) {
    if (campo === "") {
      setError((prevError) => ({
        ...prevError,
        [campoError]: { valid: false, msg: "*Campo obrigatório" }
      }))
    } else {
      setError((prevError) => ({
        ...prevError,
        [campoError]: { valid: true, msg: "" }
      }));
    }
  }

  function handlerError(e) {
    const field = e.target.name
    switch (field) {
      case "datavencimento":
        hError(fieldDespesa.datavencimento, "datavencimento")
        break;
      case "descricao":
        hError(fieldDespesa.descricao, "descricao")
        break;
      case "valor":
        hError(fieldDespesa.valor, "valor")
        break;

      default:
        break;
    }
  }
  
  function handlerSubmit() {
    if ((error.datavencimento.valid && fieldDespesa.datavencimento !== "") &&
      (error.descricao.valid && fieldDespesa.descricao !== "") &&
      (error.valor.valid && fieldDespesa.valor !== "")) {
      // data.sendDataReceita(fieldDespesa);
      // console.log("201")
      toogleModalDespesa()
      setfieldDespesa((e) => ({
        ...e,
        tipo: "geral",
        datavencimento: "",
        descricao: "",
        valor: ""

      }))
    } else {
      console.log("Error - 400");
    }
  }

  return (
    //está dentro de dashboard
    <Modal
      title={titulo}
      open={openModal.despesa}
      onOk={handlerSubmit}
      onCancel={toogleModalDespesa}
    >
      <Divider orientation="left"></Divider>
      {/* <InputLabel id="demo-simple-select-label">Tipo</InputLabel> */}
      <Select
        name='tipo'
        variant='outlined'
        value={fieldDespesa.tipo}
        fullWidth
        onChange={handlerChange}
        placeholder=''
      >
        <MenuItem value="geral">Geral</MenuItem>
        <MenuItem value="comida">Comida</MenuItem>
        <MenuItem value="outros">Outros</MenuItem>
      </Select>
      <TextField
        id="data"
        // label="Data"
        name="datavencimento"
        variant="outlined"
        margin="normal"
        type="date"
        fullWidth
        value={fieldDespesa.datavencimento}
        onChange={event => handlerChange(event)}
        onBlur={event => handlerError(event)}
        error={!error.datavencimento.valid}
        helperText={error.datavencimento.msg}
      />
      <TextField
        id="descricao"
        label="Descrição"
        name="descricao"
        variant="outlined"
        margin="normal"
        type="text"
        fullWidth
        value={fieldDespesa.descricao}
        onChange={event => handlerChange(event)}
        onBlur={event => handlerError(event)}
        error={!error.descricao.valid}
        helperText={error.descricao.msg}
      />
      <TextField
        id="valor"
        label="Valor"
        name="valor"
        variant="outlined"
        margin="normal"
        type="number"
        fullWidth
        value={fieldDespesa.valor}
        onChange={event => handlerChange(event)}
        onBlur={event => handlerError(event)}
        error={!error.valor.valid}
        helperText={error.valor.msg}
      />

    </Modal>
  );
};
export default ModalAddDespesas;