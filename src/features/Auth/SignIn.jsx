import PropTypes from 'prop-types';
import React from 'react';
import SignInForm from './SignInForm';

SignIn.propTypes = {
  closeDialog: PropTypes.func,
};

function SignIn(props) {
  const handleSubmit = (values) => {
    console.log(values);

    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <div>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignIn;
