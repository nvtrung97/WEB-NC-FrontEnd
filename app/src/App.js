import React from 'react';
import './App.scss';
import Signin from './pages/auth/sign-in.component'
import Signup from './pages/auth/sign-up.component'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth.context';
import CampK12 from 'containers/CampK12';
import Navbar from 'containers/Navbar';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={CampK12} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
