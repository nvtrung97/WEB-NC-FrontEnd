import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

CourseDescription.propTypes = {
  course: PropTypes.object,
};

function CourseDescription({ course }) {
  return (
    <Paper elevation={10} style={{ padding: '15px' }}>
      {course.full_description}
    </Paper>
  );
}

export default CourseDescription;
