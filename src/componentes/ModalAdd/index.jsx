import { Modal } from 'antd';


const ModalAdd = ({titulo, open, onOk, onCancel}) => {
  return (
      <Modal title={titulo} open={open} onOk={onOk} onCancel={onCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  );
};
export default ModalAdd;