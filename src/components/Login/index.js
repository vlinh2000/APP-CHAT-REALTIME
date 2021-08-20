import React from 'react';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase, { auth, db } from '../../Firebase/config'
import { useHistory } from 'react-router-dom'
import { addDocument, generateKeywords } from '../../Firebase/services';
const useStyle = makeStyles(theme => ({
    root: {
        marginTop: 50,
        minHeight: 100,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: "50px 20px"
    }
}))

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();
const ghProvider = new firebase.auth.GithubAuthProvider();

const Login = () => {
    const history = useHistory()
    const classes = useStyle();

    const handleFbLogin = async () => {
        const { user, additionalUserInfo } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                uid: user.uid,
                emmail: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
                displayName: user.displayName,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            })
        }
    }

    const handleGgLogin = async () => {
        const { user, additionalUserInfo } = await auth.signInWithPopup(ggProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                uid: user.uid,
                emmail: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
                displayName: user.displayName,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            })
        }
    }

    const handleGhLogin = async () => {
        const { user, additionalUserInfo } = await auth.signInWithPopup(ghProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                uid: user.uid,
                emmail: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
                displayName: user.displayName,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            })
        }
    }
    return (
        <div >
            <Grid container justifyContent='center'>
                <Grid item xs={3} >
                    <Paper elevation={3} className={classes.root}>
                        <Typography align='center' style={{ marginBottom: 30 }}>LOGIN WITH SOCIAL MEDIA</Typography>
                        <Button onClick={handleFbLogin} style={{ marginBottom: 10 }} variant='outlined' color='primary'>Đăng nhập bằng facebook</Button>
                        <Button onClick={handleGgLogin} style={{ marginBottom: 10 }} variant='outlined' color='primary'>Đăng nhập bằng google</Button>
                        <Button onClick={handleGhLogin} style={{ marginBottom: 10 }} variant='outlined' color='primary'>Đăng nhập bằng github</Button>
                    </Paper>

                </Grid>
            </Grid>
        </div>
    );
};

export default Login;