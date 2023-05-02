import { Form, Select, Modal, Spin, Avatar } from 'antd';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { useForm } from 'antd/es/form/Form';
import { debounce } from 'lodash';
import { db } from '../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeOut = 300, curMembers, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeOut);
  }, [debounceTimeOut, fetchOptions, curMembers]);

  return (
    <Select
      style={{ width: '100%' }}
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small"></Spin> : null}
      {...props}
    >
      {options.map((option) => {
        return (
          <Select.Option key={option.value} value={option.value} title={option.label}>
            <Avatar size="small" src={option.photoURL}>
              {option.photoURL || option.label[0].toUpperCase()}
            </Avatar>
            {`${option.label}`}
          </Select.Option>
        );
      })}
    </Select>
  );
}

const InviteMemberModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [forms] = useForm();

  const handleOk = () => {
    const roomRef = db.collection('rooms').doc(selectedRoomId);

    roomRef.update({
      members: [
        ...selectedRoom.members,
        ...value.map((value1) => {
          return value1.value;
        }),
      ],
    });

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };

  const fetchUserList = async (search, curMembers) => {
    return db
      .collection('users')
      .where('keywords', 'array-contains', search)
      .orderBy('displayName')
      .limit(20)
      .get()
      .then((snapshot) =>
        snapshot.docs
          .map((doc) => {
            return {
              label: doc.data().displayName,
              value: doc.data().uid,
              photoURL: doc.data().photoURL,
            };
          })
          .filter((opt) => !curMembers.includes(opt.value))
      );
  };

  return (
    <div>
      <Modal title="Tạo phòng" open={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={forms} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            curMembers={selectedRoom.members}
          ></DebounceSelect>
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
