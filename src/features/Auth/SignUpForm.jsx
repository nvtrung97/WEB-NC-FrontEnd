import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from '../../components/form-controls/InputField';
import PasswordField from '../../components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
    full_name: yup
      .string()
      .required('Please enter your fullname.')
      .test(
        'should have at least 2 words',
        'Please enter at least 2 words',
        (value) => value.split(' ').length >= 2
      ),
    phone: yup.string(),
    address: yup.string(),
    birthday: yup.string(),
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      phone: '',
      address: '',
      birthday: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

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

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <InputField name="fullname" label="Full Name" form={form} />
        <InputField name="phone" label="Phone Number" form={form} />
        <InputField name="address" label="Address" form={form} />
        <TextField
          name="birthday"
          label="Birthday"
          type="date"
          defaultValue={Date.now()}
          form={form}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          disabled={isSubmitting}
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
    </div>
  );
}

export default SignUpForm;
