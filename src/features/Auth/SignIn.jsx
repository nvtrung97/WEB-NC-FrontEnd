import PropTypes from 'prop-types';
import React from 'react';
import SignInForm from './SignInForm';

SignIn.propTypes = {
  closeDialog: PropTypes.func,
};

function SignIn(props) {
  return (
    <div>
      <SignInForm />
    </div>
  );
}

export default SignIn;
