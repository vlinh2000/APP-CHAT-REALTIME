// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import firebase from '../../Firebase/config';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../Firebase/services';
import { Form, Input, Modal } from 'antd';
const AddRoomModal = () => {
    const { isVisibleAddRoomModal, setIsVisibleAddRoomModal } = React.useContext(AppContext)
    const { user: { uid } } = React.useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        setIsVisibleAddRoomModal(false);
        form.resetFields();
    }

    const handleCancel = () => {
        //handle cancel
        form.resetFields();
        setIsVisibleAddRoomModal(false);
    }


    return (
        <Modal title="Tạo phòng" visible={isVisibleAddRoomModal} onOk={handleOk}
            onCancel={handleCancel}>
            <Form layout='vertical' form={form}>
                <Form.Item label="Tên phòng" name='name'>
                    <Input placeholder="Nhập tên phòng" type='text' />
                </Form.Item>
                <Form.Item label="Mô tả" name='description'>
                    <Input.TextArea placeholder="Nhập mô tả" type='text' />
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default AddRoomModal;