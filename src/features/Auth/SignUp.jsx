import PropTypes from 'prop-types';
import React from 'react';

import SignUpForm from './SignUpForm';

SignUp.propTypes = {
  closeDialog: PropTypes.func,
};

function SignUp(props) {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
