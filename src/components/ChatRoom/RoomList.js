import React from 'react';
import { AppContext } from '../../Context/AppProvider';
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';


const { Panel } = Collapse;

const PanelStyle = styled(Panel)`
&&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }

`;

const LinkStyled = styled(Typography.Link)`
display:block;
color:white;
margin-bottom:5px;
`;


export default function RoomList() {
    const { rooms, setSelectedRoomId, setIsVisibleAddRoomModal } = React.useContext(AppContext)
    const handleAddRoom = () => {
        setIsVisibleAddRoomModal(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header="Danh sách phòng" key='1'>
                {rooms?.map(room => <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>)}
                <Button className='add-room' onClick={handleAddRoom} type='text' icon={<PlusSquareOutlined />}>Thêm phòng</Button>
            </PanelStyle>
        </Collapse>
    );
}
