import { Avatar, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const WrapperMessage = styled.div`
 margin-bottom:5px;
    .content-text{
        margin-left:30px;
        margin-top:2px;
    }
`;

const HeaderMessage = styled.div`
display:flex;
align-items:center;
    .author{
        font-weight:bold;
        margin:0 7px;
        font-size:13px;
        }

    .date{
        font-size:10px;
        margin-left:2px
    }    
    
`;


const Message = ({ photoURL, displayName, createAt, text }) => {
    return (
        <WrapperMessage>
            <HeaderMessage >
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography className='author' component="span">{displayName}</Typography>
                <Typography className='date' component="span">{createAt}</Typography>
            </HeaderMessage>
            <Typography className='content-text' component="p">{text}</Typography>
        </WrapperMessage>
    );
};

export default Message;