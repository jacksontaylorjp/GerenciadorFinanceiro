import { DatePicker, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';


const ModalAddReceitas = ({ titulo, open, onOk, onCancel }) => {

  // const style = {
  //   background: '#0092ff',
  //   padding: '8px 0',
  // };

  return (
    <Modal
      title={titulo}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Divider orientation="left"></Divider>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 15,
        }}
        style={{
          // maxWidth: 600,
        }}
        initialValues={{
          // remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tipo:"
          name="tipo"
          rules={[
            {
              required: true,
              message: 'Informe o tipo de receita!',
            },
          ]}
        >
          <Select
            defaultValue=""
            style={{ width: 120 }}
            options={[{ value: 'geral', label: 'Geral' }]}
          />
        </Form.Item>

        <Form.Item
          label="Data"
          name="data"
          rules={[
            {
              required: true,
              message: 'Informe a data de recebimento do recurso.',
            },
          ]}
        >
          <DatePicker
            placeholder="Selecione a data"   
          />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[
            {
              required: true,
              message: 'Informe a descrição da receita',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="R$"
          name="valor"
          rules={[
            {
              required: true,
              message: 'Informe o valor em R$',
            },
          ]}
        >
          <InputNumber
            defaultValue={0}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          // onChange={onChange}
          />
        </Form.Item>


      </Form>
    </Modal>
  );
};
export default ModalAddReceitas;