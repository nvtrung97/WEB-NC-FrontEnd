import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import CourseContent from '../components/Courses/CourseContent';
import CourseDescription from '../components/Courses/CourseDescription';
import CourseInfo from '../components/Courses/CourseInfo';
import CourseMenu from '../components/Courses/CourseMenu';
import CourseReview from '../components/Courses/CourseReview';
import CourseThumbnail from '../components/Courses/CourseThumbnail';
import useCourseDetail from '../components/Courses/hooks/useCourseDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailCoursePage() {
  const classes = useStyles();
  const {
    params: { courseId },
    url,
  } = useRouteMatch();

  const { course, loading } = useCourseDetail(courseId);
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <CourseThumbnail course={course} />
            </Grid>
            <Grid item className={classes.right}>
              <CourseInfo course={course} />
            </Grid>
          </Grid>
        </Paper>

        <CourseMenu course={course} />

        <Switch>
          <Route exact path={url}>
            <CourseContent course={course} />
          </Route>

          <Route path={`${url}/description`}>
            <CourseDescription course={course} />
          </Route>

          <Route path={`${url}/reviews`}>
            <CourseReview course={course} />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailCoursePage;
