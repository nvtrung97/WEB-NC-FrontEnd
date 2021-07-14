import React, { useState, useEffect } from 'react';
import './styles.scss';
import CourseContainer from './CourseContainerSearch';
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';

import Checkbox from './checkbox';
const Search = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params);
  const [query, setQuery] = useState(params);
  const [cateRegis, setCateRegis] = useState([{
    "_id": 1,
    "name": "Khóa học lập trình",
    "count": 2
  }]);
  let contextCate = useCategory();
  let context = useProduct();
  useEffect(() => {
    const Temp = new URLSearchParams(window.location.search);
    const paramsTemp = Object.fromEntries(Temp.entries());
    setQuery(paramsTemp);
  }, [])
  return (
    <div className="online-courses container">
      <h1>
        SEARCH
      </h1>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
       
        <hr className="seperator" />
        <Checkbox/>
        <div style={{ padding: '20px' }}>
          <p style={{ color: 'white', fontSize: '20px' }}>You are searching: <b>{query.keyword ? query.keyword : ''}</b></p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <CourseContainer
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
