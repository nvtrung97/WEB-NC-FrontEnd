import LoginAdmin from '../components/sign-in/sign-in.component';
import { useAuth } from '../contexts/auth';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
const Login = () => {
    let context = useAuth();
    let history = useHistory();
    useEffect(() => {
        if(context.authenticated == true) history.push('/');
    })
    return (
        <div>
            <LoginAdmin />
        </div>
    )
}
export default Login
