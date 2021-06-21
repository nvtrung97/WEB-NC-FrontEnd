import React from 'react';

CourseList.propTypes = {};

function CourseList(props) {
  const courseList = [
    {
      _id: 1,
      name: 'Lập trình C',
      category_id: 1,
      url_image: 'link url from cloundinary',
      short_description: 'Đây khóa học tốt cho người mới học lập trình',
      full_description: 'khóa học này gồm các phần...',
      user_id: 1,
      full_name: 'Nguyễn Hảo',
      avatar_url: 'https://',
      created_at: '2021-05-18 07:33:32.352162+00',
    },
    {
      _id: 2,
      name: 'Lập trình Java',
      category_id: 1,
      url_image: 'link url from cloundinary',
      short_description: 'Đây khóa học tốt cho người mới học lập trình Java',
      full_description: 'khóa học này gồm các phần...',
      user_id: 1,
      full_name: 'Nguyễn Hảo',
      avatar_url: 'https://',
      created_at: '2021-05-18 07:33:32.352162+00',
    },
  ];
  return <div>course list</div>;
}

export default CourseList;
