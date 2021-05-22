import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../../features/Auth/SignIn';
import SignUp from '../../features/Auth/SignUp';

const MODE = {
  SignUp: 'signup',
  SignIn: 'signin',
};

const Header = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  // const [open, setOpen] = useState(false);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  // const handleLogin = () => {
  //   setIsAuth(true);
  // };
  const handleLogout = () => {
    setAnchorEl(null);
    setIsAuth(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              HOME
            </Link>
          </Typography>
          {!isAuth && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenForm}
            >
              Log in
            </Button>
          )}
          {isAuth && (
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title"
      >
        <IconButton onClick={handleCloseForm} className={classes.closeButton}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.SignUp && (
            <>
              <SignUp closeDialog={handleCloseForm} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.SignIn)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.SignIn && (
            <>
              <SignIn closeDialog={handleCloseForm} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.SignUp)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

export default Header;
