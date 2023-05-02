import { Avatar, Button, Typography } from 'antd';
import styled from 'styled-components';
import { auth } from '../firebase/config';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfo() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <WrapperStyled>
      <div>
        <Avatar src={user.photoURL}>{user.photoURL || user.displayName[0].toUpperCase()}</Avatar>
        <Typography.Text className="username">{user.displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          auth.signOut();
        }}
      >
        Đăng Xuất
      </Button>
    </WrapperStyled>
  );
}
export default UserInfo;
