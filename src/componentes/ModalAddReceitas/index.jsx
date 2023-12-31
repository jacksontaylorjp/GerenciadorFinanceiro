import { MenuItem, Select, TextField } from '@mui/material';
import { Button, Divider, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { data } from '../../controller';
import { StatusModalContext } from 'context/StatusModalContext';
import { toast } from 'react-toastify';

const ModalAddReceitas = ({ titulo }) => {
  const { openModal, toggleModalReceita, fieldReceita, setFieldReceita } = useContext(StatusModalContext);

  //usando apenas um useState para os campos do formulário
  // const [fieldReceita, setFieldReceita] = useState({
  //   tipo: "geral", datarecebimento: "", descricao: "", valor: ""
  // })

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

  function handlerSubmit() {
    if ((error.datarecebimento.valid && fieldReceita.datarecebimento !== "") &&
      (error.descricao.valid && fieldReceita.descricao !== "") &&
      (error.valor.valid && fieldReceita.valor !== "")) {
      console.log(fieldReceita)
      data.sendDataReceita(fieldReceita);
      console.log("201")
      toggleModalReceita()
      setFieldReceita((e) => ({
        ...e,
        tipo: "geral",
        datarecebimento: "",
        descricao: "",
        valor: ""
      }))
      toast.success("Receita adicionada com sucesso!")
    } else {
      hError(fieldReceita.datarecebimento, "datarecebimento");
      hError(fieldReceita.descricao, "descricao");
      hError(fieldReceita.valor, "valor");
      //toast para error
      toast.error("Erro ao adicionar receita!");
      console.log("Error - 400");
    }
  }
  function handlerEdit() {
    if ((error.datarecebimento.valid && fieldReceita.datarecebimento !== "") &&
      (error.descricao.valid && fieldReceita.descricao !== "") &&
      (error.valor.valid && fieldReceita.valor !== "")) {
      data.updateReceita(fieldReceita);
      console.log(fieldReceita, 'modal');
      console.log("201")
      toggleModalReceita()
      setFieldReceita((e) => ({
        ...e,
        tipo: "geral",
        datarecebimento: "",
        descricao: "",
        valor: ""
      }))
      toast.success("Receita salva com sucesso!")
    } else {
      hError(fieldReceita.datarecebimento, "datarecebimento");
      hError(fieldReceita.descricao, "descricao");
      hError(fieldReceita.valor, "valor");
      //toast para error
      toast.error("Erro ao salvar receita!");
      console.log("Error - 400");
    }
  }

  return (
    <>
      {/* //está dentro de dashboard */}
      <Modal
        title={titulo}
        open={openModal.receita}
        onCancel={toggleModalReceita}
        footer={() => (
          <>
            <Button type="primary" onClick={toggleModalReceita}>Voltar</Button>
            <Button type="primary" onClick={handlerEdit}>Salvar alterações</Button>
            <Button type="primary" onClick={handlerSubmit}>Nova receita</Button>
          </>
        )}
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
          value={fieldReceita.datarecebimento}
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
          value={fieldReceita.descricao}
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
          value={fieldReceita.valor}
          onChange={event => handlerChange(event)}
          onBlur={event => handlerError(event)}
          error={!error.valor.valid}
          helperText={error.valor.msg}
        />
      </Modal>
    </>
  );
};
export default ModalAddReceitas;