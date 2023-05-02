import { Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { useForm } from 'antd/es/form/Form';
import { addDocument } from '../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [forms] = useForm();

  const handleOk = () => {
    addDocument('rooms', { ...forms.getFieldValue(), members: [user.uid] });
    forms.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    forms.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal title="Tạo phòng" open={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={forms} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng"></Input>
          </Form.Item>
          <Form.Item label="Mô tả" name="desc">
            <Input.TextArea placeholder="Nhập mô tả"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
