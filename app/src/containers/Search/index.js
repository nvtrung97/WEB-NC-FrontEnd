import React, { useState, useEffect } from 'react';
import './styles.scss';
import CourseContainer from './CourseContainerSearch';
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
let slides = [
  <img src="https://toidammeit.files.wordpress.com/2016/07/499292_1aeb_2.jpg" alt="1" />,
  <img src="https://braniumacademy.net/wp-content/uploads/2020/08/Banner_Java_2.png" alt="2" />,
  <img src="https://codeschool.vn/wp-content/uploads/2020/06/featured-nodejs-course.jpg" alt="3" />,
  <img src="http://newsky.edu.vn/wp-content/uploads/khoa-hoc-tieng-anh-cho-nguoi-mat-goc.jpg" alt="4" />,
  <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/273/img/image_url.jpg" alt="5" />];
const Search = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const [query, setQuery] = useState(params);
  const [cateRegis, setCateRegis] = useState([{
    "_id": 1,
    "name": "Khóa học lập trình",
    "count": 2
  }]);
  let contextCate = useCategory();
  let context = useProduct();
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
        SEARCH
      </h1>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{  padding: '20px' }}>
          <p style={{color: 'white', fontSize: '20px' }}>You are searching: <b>{query.keyword ? query.keyword : ''}</b></p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <CourseContainer
              gradeRanges={["1-4", "5-8", "9-12"]}
              categoriesRe={cateRegis}
              query={query}
            />
          </div>
        </div>
      </div>
      <div className="book-button">
      </div>
    </div>
  )
};

export default Search;
