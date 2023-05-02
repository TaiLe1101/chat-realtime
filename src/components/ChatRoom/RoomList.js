import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
  }

  .add-room {
    color: white;
    padding: 0;
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <>
      <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyled header="Danh sách các phòng" key="1">
          {rooms.map((room) => {
            return (
              <LinkStyled
                onClick={() => {
                  setSelectedRoomId(room.id);
                }}
                key={room.id}
              >
                {room.name}
              </LinkStyled>
            );
          })}
          <Button onClick={handleAddRoom} icon={<PlusSquareOutlined></PlusSquareOutlined>} type="text" className="add-room">
            Thêm phòng
          </Button>
        </PanelStyled>
      </Collapse>
    </>
  );
}
export default RoomList;
