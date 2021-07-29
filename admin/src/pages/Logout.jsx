import LoginAdmin from '../components/sign-in/sign-in.component';
import { useAuth } from '../contexts/auth';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
const Logout = () => {
    let context = useAuth();
    let history = useHistory();
    useEffect(() => {
        context.signOut();
        history.push('/login');
        window.location.reload(false);
    },[])
    return (
        <div>
            <LoginAdmin />
        </div>
    )
}
export default Logout
