import React, { useEffect } from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'
import { AuthProvider } from '../../contexts/auth';
import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'
import ReactNotifications from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import 'animate.css';
const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    return (
        <BrowserRouter>
           <ReactNotifications />
            <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <AuthProvider>
                         
                            <TopNav />
                            <div className="layout__content-main">

                                <Routes />

                            </div>
                        </AuthProvider>
                    </div>
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layout
