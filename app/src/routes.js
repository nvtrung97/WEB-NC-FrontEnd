import { Navigate } from 'react-router-dom';
import CampK12 from 'containers/Home';
import Navbar from 'containers/Navbar';
import Signin from './pages/auth/sign-in.component'
import Signup from './pages/auth/sign-up.component'
import NotFound from './pages/NotFound';
import React, { Component }  from 'react';
const routes = [
  {
    path: 'app',
    element: "",
    children: [
      { path: '*', element: <Signin />  }
    ]
  },
  {
    path: '/',
    element: '',
    children: [
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },
      { path: '404', element: <NotFound /> },

    ]
  }
];

export default routes;
