import { Col, Divider, Modal, Row, Select, Typography } from 'antd';


const ModalAddReceita = ({ titulo, open, onOk, onCancel }) => {

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

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <Typography level={5}>Tipo:</Typography>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            options={[{ value: 'salario', label: 'Salário' }]}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default ModalAddReceita;