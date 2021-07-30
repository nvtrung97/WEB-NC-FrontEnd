import React, { useEffect, useState } from 'react'

import { Route, Switch } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import Dashboard from '../pages/Dashboard'
import Courses from '../pages/Courses'
import Categories from '../pages/Categories'
import Lectures from '../pages/Lectures'
import Students from '../pages/Students'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import { CategoryProvider } from '../contexts/category';
import { AdminProvider } from '../contexts/admin';
import { useAuth } from '../contexts/auth';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
const Routes = () => {
    let history = useHistory();
    let context = useAuth();
    let [authenticated,setAuthenticated]= useState(context.authenticated);
    const location = useLocation();
    useEffect(() => {
       if(location.pathname != '/login'){
        setAuthenticated(context.authenticated);
        if(authenticated===false) history.push('/login');
       }
    })
    return (
        <CategoryProvider>
            <AdminProvider>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/courses' component={Courses} />
                    <Route path='/categories' component={Categories} />
                    <Route path='/lecturers' component={Lectures} />
                    <Route path='/students' component={Students} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                </Switch>
            </AdminProvider>
        </CategoryProvider>
    )
}

export default Routes
