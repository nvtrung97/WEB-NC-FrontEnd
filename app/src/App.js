import React from 'react';
import './App.scss';
import './app.css';
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
import Search from 'containers/Search';
import  Footer from './components/Footer/index';
import  DetailPage from './containers/DetailProduct/index';
import  Videos from './containers/Videos/index';
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
                <Route exact path="/search" component={Search} />
                <Route exact path="/detail/:id" component={DetailPage} />
                <Route exact path="/detail/:id/videos" component={Videos} />
              </Switch>
              <hr className="seperator" style={{opacity: '0.5'}}/>
              <Footer  className = 'footer_a'/>         
            </BrowserRouter>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
