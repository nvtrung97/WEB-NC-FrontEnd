import { useAuth } from '../../contexts/auth.context';
import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Leaderboard from 'static/leaderboard.svg';
import CampK12Logo from 'static/camp-k-12-logo.svg';
import { useHistory } from "react-router-dom";
import './styles.scss';
import './styles.css';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
const Navbar = () => {
  const AuthContext = useAuth();
  let authenticated, user;
  user = AuthContext.user
  authenticated = AuthContext.authenticated;
  const [isShowMobileNav, setIsShowMobileNav] = useState(false);
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogout = () => {
    AuthContext.signOut();
    return window.location.reload();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleClickLogin() {
    history.push("/signin");
  }
  let userName = '';
  let avatar = '';
  if (_.has(user.user, 'user_id')) {
    userName = user.user.full_name;
    avatar = user.user.avatar_url;
  }
  return (
    <nav className="container">
      <a href="/">
        <img src={CampK12Logo} alt="Camp K12 Logo" />
      </a>
      <div className={isShowMobileNav ? 'nav-items-mobile' : 'nav-items'}>
        <ul>
          <li>
            <NavLink to="online-courses" activeClassName="selected">
              Online Courses
            </NavLink>
            <div />
          </li>
          <li>
            <NavLink to="offline-camp" activeClassName="selected">
              Offline Camps
            </NavLink>
            <div />
          </li>
          <li>
            <NavLink to="refer-n-earn" activeClassName="selected">
              Refer & Earn
            </NavLink>
            <div />
          </li>
        </ul>
        <div>
          <button className="leaderboard">
            <img alt="" role="button" src={Leaderboard} />
          </button>
          <button>
            Free Trial
          </button>
          {authenticated === true ?
            <div>
              <Button onClick={handleClick} className = 'editProfile'>
                 {'Hello:' +userName}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile <Avatar className='size-avatar' alt="Remy Sharp" src={avatar} /></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
              </Menu>
            </div>
            : <button type="button" onClick={handleClickLogin}>
              Log In
            </button>}
        </div>
      </div>
      <button className="mobile-nav-button" onClick={() => setIsShowMobileNav(!isShowMobileNav)}>
        {isShowMobileNav ? '🞩' : '☰'}
      </button>
    </nav>
  )
}

export default Navbar;