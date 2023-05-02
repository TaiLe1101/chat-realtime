import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import styled from 'styled-components';
import Message from './Message';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import { useForm } from 'antd/es/form/Form';
import useFireStore from '../../hooks/useFireStore';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__desc {
      font-size: 12px;
    }
  }
`;

const WrapperStyled = styled.div`
  height: 95vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState('');
  const [forms] = useForm();
  const handleChatChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid: user.uid,
      photoURL: user.photoURL,
      roomId: selectedRoom.id,
      displayName: user.displayName,
    });

    forms.resetFields(['message']);
  };

  const condition = useMemo(() => {
    return {
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);

  const messages = useFireStore('messages', condition);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__desc">{selectedRoom.desc}</span>
            </div>
            <ButtonGroupStyled>
              <Button onClick={() => setIsInviteMemberVisible(true)} type="text" icon={<UserAddOutlined></UserAddOutlined>}>
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => {
                  return (
                    <Tooltip title={member.displayName} key={member.uid}>
                      <Avatar src={member.photoURL}>{member.photoURL || member.displayName[0].toUpperCase()}</Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((msg) => {
                return (
                  <Message
                    text={msg.text}
                    photoURL={msg.photoURL}
                    displayName={msg.displayName}
                    createdAt={msg.createdAt}
                    key={msg.id}
                  ></Message>
                );
              })}
            </MessageListStyled>
            <FormStyled form={forms}>
              <Form.Item name="message">
                <Input placeholder="Tin Nhắn" bordered={false} onChange={handleChatChange} onPressEnter={handleOnSubmit}></Input>
              </Form.Item>
              <Button onClick={handleOnSubmit} type="primary">
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <>
          <Alert message="Hãy chọn phòng" type="info" showIcon style={{ margin: 5 }} closable></Alert>
        </>
      )}
    </WrapperStyled>
  );
}
export default ChatWindow;
