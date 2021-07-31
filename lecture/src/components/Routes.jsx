import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Categories from '../pages/Categories'
import Lectures from '../pages/Lectures'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Logout from '../pages/Logout'
import { CategoryProvider } from '../contexts/category';
import { AdminProvider } from '../contexts/admin';
import { useAuth } from '../contexts/auth';
import { ProfileProvider } from '../contexts/profile';
import { CourseProvider } from '../contexts/courses';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
const Routes = () => {
    let history = useHistory();
    let context = useAuth();
    let [authenticated, setAuthenticated] = useState(context.authenticated);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname != '/login') {
            setAuthenticated(context.authenticated);
            if (authenticated === false) history.push('/login');
        }
    })
    return (
        <CourseProvider>
            <CategoryProvider>
                <AdminProvider>
                    <ProfileProvider>
                        <Switch>
                            <Route path='/' exact component={Dashboard} />
                            <Route path='/post-courses' component={Courses} />
                            <Route path='/update-courses' component={Categories} />
                            <Route path='/myself' component={Profile} />
                            <Route path='/login' component={Login} />
                            <Route path='/logout' component={Logout} />
                        </Switch>
                    </ProfileProvider>
                </AdminProvider>
            </CategoryProvider>
        </CourseProvider>
    )
}

export default Routes
