import { Typography, Tooltip } from '@material-ui/core';
import { Form, Input, Button, Divider } from 'antd';
import React, { useEffect, useRef } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Alert } from '@material-ui/lab';
import styled from 'styled-components'
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { Avatar } from 'antd';
import { addDocument } from '../../Firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFirebase from '../../hooks/useFirebase';
import { formatRelative } from 'date-fns'
import Picker from 'emoji-picker-react';

const HeaderStyled = styled.div`
display: flex;
height:60px;
justify-content: space-between;
align-items:center;
padding: 0 1rem;
border-bottom:1px solid rgb(230,230,230);

   .header {
       &__title {   
        font-weight:bold;
       };

       &__description{
        font-size:13px
       };
   } 

`;

const WrapperStyled = styled.div`
height:100vh;
`;

const ButtonGroupStyled = styled.div`
display:flex;
align-items:center;
`;


const ContentStyled = styled.div`
height:calc( 100% - 80px);
display:flex;
flex-direction:column;
padding:11px;
justify-content:flex-end;
`;

const MessageListStyled = styled.div`
max-height:100%;
overflow-y:auto;
`;

const FormStyled = styled.div`
.MuiInput-root{
    border : 1px solid rgb(230,230,230);
    padding:2px 10px;
    width:50%;
}

.MuiButton-root{
    height:100%
}
`;

const formatDate = (second) => {
    let format = ''
    if (second) {
        format = formatRelative(new Date(second * 1000), new Date());
        format = format.charAt(0).toUpperCase() + format.slice(1);
    }
    return format;
}

const ChatWindow = () => {
    const { members, selectedRoom, selectedRoomId, setIsVisibleAddUsersModal, user } = React.useContext(AppContext);
    const { user: { uid, photoURL, displayName } } = React.useContext(AuthContext);
    const [inputValue, setInputValue] = React.useState('');
    const [form] = Form.useForm()
    const inputRef = React.useRef();
    const messageListRef = React.useRef();
    // const [chosenEmoji, setChosenEmoji] = React.useState(null);

    // const onEmojiClick = (event, emojiObject) => {
    //     setChosenEmoji(emojiObject.unified);
    // };

    const handleOnchange = ({ target }) => {
        setInputValue(target.value);
    }

    const handleSubmit = async () => {
        await addDocument('messages', {
            uid,
            roomId: selectedRoomId,
            photoURL,
            displayName,
            text: inputValue
        });
        await form.resetFields();
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }


    const messageCondition = React.useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoomId
        }
    }, [selectedRoomId])

    const message = useFirebase('messages', messageCondition);

    React.useEffect(() => {
        if (messageListRef?.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight + 10;
        }
    }, [message])
    return (
        <WrapperStyled>
            {selectedRoom ? (
                <>
                    <HeaderStyled>
                        <div className="header__info">
                            <Typography className="header__title" variant="h6">{selectedRoom?.name}</Typography>
                            <Typography className="header__description" component="span">{selectedRoom?.description}</Typography>
                        </div>
                        <ButtonGroupStyled>
                            <Button onClick={() => setIsVisibleAddUsersModal(true)} icon={<UserAddOutlined />} type='text'>Mời</Button>
                            <Avatar.Group maxCount={3}>
                                {members?.map((member, index) => <Tooltip key={index} title={member.displayName}><Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar></Tooltip>)}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled ref={messageListRef}>
                            {

                                message?.map(mes => <Message key={mes.id} photoURL={mes.photoURL} createAt={formatDate(mes.createAt?.seconds)} displayName={mes.displayName} text={mes.text} ></Message>)
                            }
                        </MessageListStyled>
                        <Divider></Divider>
                        <FormStyled>
                            <Form form={form} style={{ display: 'flex' }}>
                                {/* <Picker onEmojiClick={onEmojiClick} /> */}
                                <Form.Item style={{ width: '50%' }} name="text">
                                    <Input type="text" ref={inputRef} onPressEnter={handleSubmit} onChange={handleOnchange} placeholder="Nhập tin nhắn ..." />
                                </Form.Item>
                                <Button onClick={handleSubmit}>Gửi</Button>
                            </Form>
                        </FormStyled>
                    </ContentStyled> </>) : <Alert severity="info">Hãy chọn phòng để bắt đầu trò chuyện</Alert>

            }
        </WrapperStyled >
    );
};

export default ChatWindow;