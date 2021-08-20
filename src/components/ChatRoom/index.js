import { Avatar, Button, Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { auth } from '../../Firebase/config';
import { makeStyles } from '@material-ui/core';
import Sidebar from './SideBar';
import ChatWindow from './ChatWindow';

const useStyle = makeStyles((theme) => ({
    rootLeft: {
        backgroundColor: '#'
    }
}))

const ChatRoom = () => {
    const classes = useStyle()
    return (
        <div>
            <Grid container>
                <Grid className={classes.rootLeft} item xs={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9}>
                    <ChatWindow />
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatRoom;