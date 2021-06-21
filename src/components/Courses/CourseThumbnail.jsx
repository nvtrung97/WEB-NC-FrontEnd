import React from 'react';
import PropTypes from 'prop-types';
import { THUMBNAIL_PLACEHOLDER } from '../../config/config';
import { Box } from '@material-ui/core';

CourseThumbnail.propTypes = {
  course: PropTypes.object,
};

function CourseThumbnail({ course }) {
  const thumbnailUrl = course?.url_image
    ? course?.url_image
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box>
      <img src={thumbnailUrl} alt={course?.name} width="100%" />
    </Box>
  );
}

export default CourseThumbnail;
