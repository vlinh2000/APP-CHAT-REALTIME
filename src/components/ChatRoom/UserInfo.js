import { Avatar, Typography, Button } from '@material-ui/core';
import React from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { makeStyles } from '@material-ui/core';
import { auth } from '../../Firebase/config';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: 'solid 1px rgba(82,38,83)'
    }
}))
const UserInfo = () => {
    const classes = useStyle();
    const { user: {
        displayName,
        photoURL,
        uid
    } } = React.useContext(AuthContext);
    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ marginRight: 10 }} src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography>{displayName}</Typography>
            </div>
            <Button onClick={() => { auth.signOut() }} variant="outlined" color='secondary'>Đăng xuất</Button>
        </div>
    );
};

export default UserInfo;