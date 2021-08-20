import React from 'react';
import UserInfo from './UserInfo';
import RoomList from './RoomList';

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: "#3f0e40",
        color: '#FFF'
    }
}))

const SideBar = () => {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <UserInfo />
            <RoomList />
        </div>
    );
};

export default SideBar;