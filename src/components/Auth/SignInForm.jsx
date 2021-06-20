import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from '../form-controls/InputField';
import PasswordField from '../form-controls/PasswordField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth.context';
import _ from 'lodash';
import { BoxLoading } from 'react-loadingg';
import { GoogleLogin } from 'react-google-login';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 3, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SignInForm(props) {
  const [messageNotify, setMessageNotify] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useAuth();
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

  const handleSubmit = async (values) => {
    setLoading(true);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    let entity = {
      login_type: 'auth',
      email: values.email,
      password: values.password,
      token_id: '',
    };
    context
      .signIn(entity)
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        if (_.has(error, 'response'))
          if (error.response.data.message.includes('Password')) {
            setMessageNotify('Password incorrect');
          } else setMessageNotify('Email does not exist');
      })
      .then((res) => {
        if (_.has(res, 'status'))
          if (res.status === 201) window.location.reload();
      });
  };
 let googleResponse = (response) => {
    console.log('res cua google:', response);
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
        console.log(error.response);
        if (_.has(error, 'response'))
          if (error.response.data.message.includes('Password')) {
            setMessageNotify('Password incorrect');
          } else setMessageNotify('Email does not exist');
      })
      .then((res) => {
        
        if (_.has(res, 'status'))
          if (res.status === 201) window.location.reload();
      });
  };
  const { isSubmitting } = form.formState;

  return (
    <div>
      {loading === true ? <BoxLoading /> : ''}
      <div className={classes.root}>
        {isSubmitting && <LinearProgress className={classes.progress} />}

        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography className={classes.title} component="h3" variant="h5">
          SIGN IN
        </Typography>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <label>{messageNotify}</label>
          <Button
            disabled={isSubmitting}
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Sign in
          </Button>
          <GoogleLogin
            clientId='815350976526-kem3lh8prvspmiv39l3g00op631p236m.apps.googleusercontent.com'
            buttonText="Login"
            onSuccess={googleResponse}
     
          />
        </form>
      </div>
    </div>
  );
  
}

export default SignInForm;
