
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
  TextField
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from '../form-controls/InputField';
import PasswordField from '../form-controls/PasswordField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from "../../contexts/auth.context";
import _ from 'lodash';
import { BoxLoading } from 'react-loadingg';
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

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SignUpForm(props) {
  const [loading, setLoading] = useState(false);
  const [otpServer, setOtpServer] = useState('');
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [submitOTP, setSubmitOTP] = useState(false);
  const [submitSignUp, setSubmitSignUp] = useState(false);
  const context = useAuth();
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup.string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
    full_name: yup.string()
      .required('Please enter your full name'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const formOTP = useForm({
    defaultValues: {
      otp: ''
    }
  });
  const handleSubmitOtp = async (values) => {
    setSubmitOTP(true);
    setLoading(true);
    console.log(otpServer.token_otp);
    context.otp(otpServer.token_otp, values).catch((error) => {
      console.log(error);
      if (_.has(error, 'response'))
        if (error.response.data.message.includes('Wrong')) {
          setMessageNotify('Wrong OTP');
          setSubmitOTP(false);
        }
    }).then((res) => {
      setLoading(false);
      if (_.has(res, 'status'))
        if (res.status == 201) {
          setMessageNotify('Successful account registration');
        }
    })
  }
  const handleSubmit = async (values) => {
    setLoading(true);
    setSubmitSignUp(true);
    values.birthday = '2020-10-10';
    console.log(values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    context.signUp(values).catch((error) => {
      if (_.has(error, 'response'))
        if (error.response.data.message.includes('exists')) {
          setMessageNotify('Email exist');
          setSubmitSignUp(false);
        }
    }).then((res) => {
      setLoading(false);
      if (_.has(res, 'status'))
        if (res.status == 201) {
          setIsShowOtp(true);
          console.log(res.data);
          setOtpServer(res.data);
        }
    })
  };
  const [messageNotify, setMessageNotify] = useState("");
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create an Account
      </Typography>
      {(loading == true) ? <BoxLoading /> : ''}
      <h5>{messageNotify}</h5>
      {(isShowOtp) ?
        <form onSubmit={formOTP.handleSubmit(handleSubmitOtp)}>
          <InputField name="otp" label="OTP" form={formOTP} defaultValue='' />
          <Button
            disabled={submitOTP}
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Submit
        </Button>
        </form>
        :
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <InputField name="full_name" label="Full Name" form={form} />
          <InputField name="address" label="Address" form={form} />
          <InputField name="phone" label="phone" form={form} />
          <TextField
            name="birthday"
            label="Birthday"
            type="date"
            form={form}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            disabled={submitSignUp}
            type="submit"
            className={classes.submit}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Create an account
        </Button>
        </form>
      }
    </div>
  );
}

export default SignUpForm;