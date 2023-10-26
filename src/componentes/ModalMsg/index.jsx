import React, { useContext, useEffect } from 'react';
import { Alert, Modal } from 'antd';
import { StatusModalContext } from 'context/StatusModalContext';

const ModalMsg = ({msg, type}) => {
    const { openModal, toogleModalMsg } = useContext(StatusModalContext);
    return (
        <Modal
            title='Mensagem'
            open={openModal.msg} 
            onCancel={toogleModalMsg}
            okButtonProps={{style:{display:'none'}}}
            cancelButtonProps={{style:{display:'none'}}}
        >
            <Alert message={msg} type={type} showIcon/>
        </Modal>
    );
};
export default ModalMsg;
