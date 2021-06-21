import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

CourseItem.propTypes = {};

function CourseItem(props) {
  const history = useHistory();

  const classes = useStyles();

  const course = {
    _id: 1,
    name: 'Lập trình C',
    category_id: 1,
    url_image: 'link url from cloundinary',
    short_description: 'Đây khóa học tốt cho người mới học lập trình',
    full_description: 'khóa học này gồm các phần...',
    user_id: 1,
    full_name: 'Nguyễn Hảo',
    avatar_url: 'https://picsum.photos/300/300',
    created_at: '2021-05-18 07:33:32.352162+00',
  };

  const handleClick = () => {
    history.push(`/course/${course._id}`);
  };
  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={course.avatar_url}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.name}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {course.short_description}
          </Typography>
          <br />
          <Typography
            align="right"
            variant="body2"
            color="primary"
            component="p"
          >
            {course.full_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    objectFit: 'cover',
  },
});

export default CourseItem;
