import React from 'react';
import { AuthProvider } from '../../contexts/auth.context';
import SignUp from '../../components/sign-up/sign-up.component';
import './sign-in-sign-up.styles.scss';

const Signup = () => (
    <div className='sign-in-and-sign-up'>
        <SignUp />
    </div>
)

export default Signup;
