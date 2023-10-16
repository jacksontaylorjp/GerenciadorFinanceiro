import { MenuItem, Select, TextField } from '@mui/material';
import { Divider, Modal } from 'antd';
import React, { useState } from 'react';


const ModalAddReceitas = ({ titulo, open, onOk, onCancel }) => {

  // const style = {
  //   background: '#0092ff',
  //   padding: '8px 0',
  // };

  //usando apenas um useState para os campos do formulário
  const [fieldReceita, setFieldReceita] = useState({
    tipo: "", data: "", descricao: "", valor: ""
  })

  function handlerChange(e) {
    const newData = { ...fieldReceita }
    const value = e.target.value
    const field = e.target.name

    switch (field) {
      case "tipo":
        newData.tipo = value;
        break;
      case "data":
        newData.data = value;
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
    console.log(newData);

  }

  function handlerSubmit() {
    console.log(fieldReceita);
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
      <Select
        label="Tipo"
        name='tipo'
        variant='outlined'
        value={fieldReceita.tipo}
        fullWidth
        onChange={handlerChange}
      >
        <MenuItem value="Geral">Geral</MenuItem>
        <MenuItem value="Outros">Outros</MenuItem>
      </Select>
      <TextField
        id="data"
        label="Data"
        name="data"
        variant="outlined"
        margin="normal"
        type="date"
        fullWidth
        onChange={event => handlerChange(event)}
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
      />

    </Modal>
  );
};
export default ModalAddReceitas;