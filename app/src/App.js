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
import { CategoryProvider } from './contexts/categories.context';
import { ProductProvider } from './contexts/product.context';
import Home from 'containers/Home';
import Navbar from 'containers/Navbar';

function App() {
  return (
    <div>
      <AuthProvider>
        <CategoryProvider>
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
        </CategoryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
