import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { Box, Link, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

CourseMenu.propTypes = {
  course: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,

    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },
    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function CourseMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Course content
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/description`} exact>
          Full Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default CourseMenu;
