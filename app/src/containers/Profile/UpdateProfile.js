import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useProfile } from '../../contexts/profile.context';
import { BoxLoading } from 'react-loadingg';
import { useHistory } from "react-router-dom";
import 'react-notifications-component/dist/theme.css';
import {store} from 'react-notifications-component'
import 'animate.css';
import _ from 'lodash';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Courses
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UpdateProfile(props) {
    const classes = useStyles();
    let history = useHistory()
    const [email, setEmail] = useState('');
    const [Oldpassword, setOldPassword] = useState('********');
    const [newpassword, setNewPassword] = useState('********');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOTP] = useState('');
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(false);
    let context = useProfile();
    useEffect(() => {
        if (props.user) {
            setEmail(props.user.email);
            setFullname(props.user.full_name);
            setAddress(props.user.address);
            setPhone(props.user.phone);
        }
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (Oldpassword != newpassword) {
            let entity = {
                oldPassword: Oldpassword,
                password: newpassword
            }
            context.changePassword(entity).then((res) => {
                addNoti('Update password successfully','success', 'Update')
            }).catch((er)=>{
                addNoti('Update password failed','danger', 'Notification');
                setLoading(false);
                return;
            })

        }
        let entityupdate = {
            email: email,
            address: address,
            full_name: fullname,
            phone: phone,
        }
        context.updateProfile(entityupdate).then((res) => {
            addNoti('Update profile successfully','success', 'Notification');
            alert('ok')
            setLoading(false);
        }).catch((err)=>{
            addNoti('Update profile failed','danger', 'Notification');
            setLoading(false);
        })
       
    }
    const addNoti = (mes, type, title) => {
        store.addNotification({
          title: title,
          message: mes,
          type: type,
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      }
    const updateInputValue = async (event) => {
        if (event.target.name == 'oldpassword') setOldPassword(event.target.value);
        if (event.target.name == 'newpassword') setNewPassword(event.target.value);
        if (event.target.name == 'address') setAddress(event.target.value);
        if (event.target.name == 'phone') setPhone(event.target.value);
        if (event.target.name == 'full_name') setFullname(event.target.value);
        if (event.target.name == 'otp') setOTP(event.target.value);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {loading === true ? <BoxLoading /> : ''}
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Update Profile
                </Typography>
                <div>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="full_name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="full_name"
                                    label="Full name"
                                    autoFocus
                                    onChange={evt => updateInputValue(evt)}
                                    value={fullname}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    value={email}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="oldpassword"
                                    label="Old Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={evt => updateInputValue(evt)}
                                    value={Oldpassword}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="newpassword"
                                    label="New password"
                                    type="password"
                                    id="repassword"
                                    autoComplete="current-password"
                                    onChange={evt => updateInputValue(evt)}
                                    value={newpassword}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="address"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    onChange={evt => updateInputValue(evt)}
                                    autoFocus
                                    value={address}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="phone"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="phone"
                                    type="number"
                                    autoFocus
                                    onChange={evt => updateInputValue(evt)}
                                    value={phone}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Agree"
                                />
                            </Grid>
                        </Grid>


                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}

                                >
                                    Update
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Button

                                    fullWidth
                                    variant="contained"
                                    onClick={() => {
                                        props.handleChangeView(0);
                                    }}
                                    className={classes.submit}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>

                    </form>

                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
