import { MenuItem, Select, TextField } from '@mui/material';
import { Divider, Modal } from 'antd';
import React, { useState } from 'react';
import { data } from '../../data';

const ModalAddReceitas = ({ titulo, open, onOk, onCancel }) => {

  // const style = {
  //   background: '#0092ff',
  //   padding: '8px 0',
  // };
  //usando apenas um useState para os campos do formulário
  const [fieldReceita, setFieldReceita] = useState({
    tipo: "geral", datarecebimento: "", descricao: "", valor: ""
  })

  const [error, setError] = useState({
    datarecebimento: { valid: true, msg: "" },
    descricao: { valid: true, msg: "" },
    valor: { valid: true, msg: "" },
  }
  );

  function handlerChange(e) {
    const newData = { ...fieldReceita }
    const value = e.target.value
    const field = e.target.name

    switch (field) {
      case "tipo":
        newData.tipo = value;
        break;

      case "datarecebimento":
        newData.datarecebimento = value;
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
    setFieldReceita(newData);

  }

  function handlerSubmit() {
    if ((error.datarecebimento.valid && fieldReceita.datarecebimento !== "") &&
      (error.descricao.valid && fieldReceita.descricao !== "") &&
      (error.valor.valid && fieldReceita.valor !== "")) {
      data.sendDataReceita(fieldReceita);
      console.log("201")
    } else {
      console.log("Error - 400");
    }
    console.log(fieldReceita);
  }

  function hError(campo, campoError ) {
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
      case "datarecebimento":
        hError(fieldReceita.datarecebimento, "datarecebimento")
        break;
      case "descricao":
        hError(fieldReceita.descricao, "descricao")
        break;
      case "valor":
        hError(fieldReceita.valor, "valor")
        break;

      default:
        break;
    }
  }

  return (
    //está dentro de dashboard
    <Modal
      title={titulo}
      open={open}
      //VER COMO VAI CHAMAR O ONOK PARA FECHAR O MODAL
      onOk={handlerSubmit}
      onCancel={onCancel}
    >
      <Divider orientation="left"></Divider>
      {/* <InputLabel id="demo-simple-select-label">Tipo</InputLabel> */}
      <Select
        name='tipo'
        variant='outlined'
        value={fieldReceita.tipo}
        fullWidth
        onChange={handlerChange}
        placeholder=''
      >
        <MenuItem value="geral">Geral</MenuItem>
        <MenuItem value="salario">Salário</MenuItem>
        <MenuItem value="outros">Outros</MenuItem>
      </Select>
      <TextField
        id="data"
        // label="Data"
        name="datarecebimento"
        variant="outlined"
        margin="normal"
        type="date"
        fullWidth
        onChange={event => handlerChange(event)}
        onBlur={event => handlerError(event)}
        error={!error.datarecebimento.valid}
        helperText={error.datarecebimento.msg}
      />
      <TextField
        id="descricao"
        label="Descrição"
        name="descricao"
        variant="outlined"
        margin="normal"
        type="text"
        fullWidth
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
        onChange={event => handlerChange(event)}
        onBlur={event => handlerError(event)}
        error={!error.valor.valid}
        helperText={error.valor.msg}
      />

    </Modal>
  );
};
export default ModalAddReceitas;