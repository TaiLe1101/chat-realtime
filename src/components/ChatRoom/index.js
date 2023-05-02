import { Col, Row } from 'antd';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';

function ChatRoom() {
  return (
    <Row>
      <Col span={6}>
        <SideBar></SideBar>
      </Col>
      <Col span={18}>
        <ChatWindow></ChatWindow>
      </Col>
    </Row>
  );
}

export default ChatRoom;
