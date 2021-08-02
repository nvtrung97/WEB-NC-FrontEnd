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
import { ProfileProvider } from './contexts/profile.context';
import Home from 'containers/Home';
import Navbar from 'containers/Navbar';
import Search from 'containers/Search';
import Footer from './components/Footer/index';
import DetailPage from './containers/DetailProduct/index';
import Videos from './containers/Videos/index';
import Profile from './containers/Profile/index';
import MyCourses from './containers/ProfileCourse/index';
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
function App() {
  return (
    <div>
      <ReactNotifications />
      <AuthProvider>
        <CategoryProvider>
          <ProfileProvider>
            <ProductProvider>
              <BrowserRouter>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signin" component={Signin} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/detail/:id" component={DetailPage} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/detail/:id/videos" component={Videos} />
                  <Route exact path="/mycourses" component={MyCourses} />

                </Switch>
                <hr className="seperator" style={{ opacity: '0.5' }} />

              </BrowserRouter>
            </ProductProvider>
          </ProfileProvider>
        </CategoryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
