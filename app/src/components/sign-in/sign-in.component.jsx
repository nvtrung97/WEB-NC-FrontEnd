import React, { useState } from 'react';
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
import { GoogleLogin } from 'react-google-login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { BoxLoading } from 'react-loadingg';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import "./sign-in.styles.css"
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



SignIn.propTypes = {
  onSubmit: PropTypes.func,
};
function SignIn(props) {
  let history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageNotify, setMessageNotify] = useState('');
  const context = useAuth();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup.string().required('Please enter your password'),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!validateEmail(email)) {
      addNoti('Please input right email!', 'danger', 'Notification');
      setLoading(false);
      return;
    }
    let entity = {
      login_type: 'auth',
      email: email,
      password: password,
      token_id: '',
    };
    context
      .signIn(entity)
      .catch((error) => {
        if (_.has(error, 'response')) {
          if (error.response.data.message.includes('Password')) {
            addNoti('Password incorrect!', 'danger', 'Notification');
          } else
            addNoti('Email does not exist!', 'danger', 'Notification');
          setLoading(false);
          return;
        }
      })
      .then((res) => {
        if (_.has(res, 'status'))
          if (res.status === 201) {
            addNoti('Login success', 'success', 'Notification');
            setTimeout(function () {
              history.push('/');
              window.location.reload(false);
            }, 2000);
          }
      })

  }
  const googleResponse = (response) => {
    setLoading(true);
    let entity = {
      login_type: 'google',
      email: '',
      password: '',
      token_id: response.tokenId,
    };
    context
      .signIn(entity)
      .catch((error) => {
        setLoading(false);
        addNoti('Somethings wrong (Maybe you deleted by admin)', 'danger', 'Notification');
      })
      .then((res) => {
        if (_.has(res, 'status'))
          if (res.status === 201) {
            addNoti('Login success', 'success', 'Notification');
            setTimeout(function () {
              history.push('/');
              window.location.reload(false);
            }, 2000);


          }
      });
  }



  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const updateInputValue = async (event) => {
    event.preventDefault();
    if (event.target.name == 'password') setPassword(event.target.value);
    if (event.target.name == 'email') setEmail(event.target.value);
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


  const { isSubmitting } = form.formState;

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {loading === true ? <BoxLoading className='indexcss' /> : ''}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <span style={{ color: 'red' }}>{messageNotify}</span>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={evt => updateInputValue(evt)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={evt => updateInputValue(evt)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

            </Grid>

          </form>

        </div>
        <div className='editlogingg'>

          <GoogleLogin className='editlogingg'
            clientId={global.config.CLIENT_ID}
            onSuccess={googleResponse}
            buttonText="Login with GG"
          >
          </GoogleLogin>
        </div>

        <Box mt={8}>

          <Copyright />

        </Box>
      </Container>
    </div>
  );
}
export default SignIn;