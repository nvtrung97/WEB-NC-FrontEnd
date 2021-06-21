import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

CourseInfo.propTypes = {
  course: PropTypes.object,
};

const useStyle = makeStyles((theme) => ({
  root: {},
  courseTitle: {},
  shortDesc: {
    margin: theme.spacing(2, 0),
  },
  btnEnroll: {
    margin: theme.spacing(2, 0),
    textTransform: 'uppercase',
  },
  moreInfo: {
    display: 'flex',
  },
}));

function CourseInfo({ course = {} }) {
  const classes = useStyle();
  const { name, short_description, number_students, score, number_reviews } =
    course;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.shortDesc}>
        {short_description}
      </Typography>
      <Box>
        <Box component="span">
          Ratings: {score}* ({number_reviews} reviews) / {number_students}{' '}
          students
        </Box>
      </Box>

      <Button color="primary" variant="contained" className={classes.btnEnroll}>
        go to course
      </Button>
    </Box>
  );
}

export default CourseInfo;
