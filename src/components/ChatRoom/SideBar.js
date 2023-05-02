import { Col, Row } from 'antd';

import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SideBarStyled = styled.div`
  background-color: #3f0e40;
  color: white;
  height: 100vh;
`;

function SideBar() {
  return (
    <SideBarStyled>
      <Row>
        <Col span={24}>
          <UserInfo></UserInfo>
        </Col>
        <Col span={24}>
          <RoomList></RoomList>
        </Col>
      </Row>
    </SideBarStyled>
  );
}
export default SideBar;
