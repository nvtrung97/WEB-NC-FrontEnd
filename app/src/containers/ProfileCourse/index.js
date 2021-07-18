import React, { useState, useEffect } from 'react';
import './styles.scss';
import CourseContainer from './courseContainer';
import { useCategory } from '../../contexts/categories.context';
const ProfileCourses = () => {
  const [cateRegis, setCateRegis] = useState([{
    "_id": 1,
    "name": "Khóa học lập trình",
    "count": 2
  }]);
  let contextCate = useCategory();
  useEffect(() => {
    let mounted = true;
    contextCate.mostRegisted()
      .then((items) => {
        if (mounted) {
          setCateRegis(items.data)
        }
      })
    return () => mounted = false;
  }, [])
  return (
    <div className="online-courses container">
      <h1>
        Your courses
      </h1>   
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}></p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <CourseContainer
              gradeRanges={["1-4", "5-8", "9-12"]}
              categoriesRe={cateRegis}
            />
          </div>
        </div>
      </div>
      <div className="book-button">
      </div>
    </div>
  )
};

export default ProfileCourses;
