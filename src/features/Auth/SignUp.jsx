import PropTypes from 'prop-types';
import React from 'react';
import SignUpForm from './SignUpForm';

SignUp.propTypes = {
  closeDialog: PropTypes.func,
};

function SignUp(props) {
  const handleSubmit = (values) => {
    console.log(values);

    const { closeDialog } = props;
    if (closeDialog) {
      closeDialog();
    }
  };
  return (
    <div>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignUp;
