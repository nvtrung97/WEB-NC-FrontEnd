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
import { ProductProvider } from './contexts/product.context';
import Home from 'containers/Home';
import Navbar from 'containers/Navbar';

function App() {
  return (
    <div>
      <AuthProvider>
        <ProductProvider>
          <BrowserRouter>
            <Navbar />
            <Switch>

              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </BrowserRouter>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
