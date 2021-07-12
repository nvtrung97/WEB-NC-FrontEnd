import React, { useState, useEffect } from 'react';

import CourseCard from 'components/CourseCard';
import './styles.scss'
import { useProduct } from '../../contexts/product.context';
const CourseContainer = ({
  gradeRanges,
  query,
  categoriesRe
}) => {
    console.log(query);
  const [cate, setCate] = useState(categoriesRe[0]);
  const [products, setProducts] = useState([]);
  let context = useProduct();
  useEffect(() => {
    let entity = {
      category_id: cate._id
    }
    let mounted = true;
    if (mounted)
      updateProducts(entity);
    return () => mounted = false;
  }, [])
  let updateProducts = (query) => {
    console.log(query);
    context.getProductByQuery(query)
      .then(items => {
        console.log(items);
        setProducts(items.data);
        return;
      })
  }
  const handleOnclick = (type) => {

  }
  return (
    <div className="course-container">

      <div className="course-cards">
        {
          products.map(
            (course) => (
              <CourseCard
                title={course.name}
                subTitle={course.category}
                happyStudents='1000'
                hours='100h'
                sessions="6"
                isWeekend='true'
                isWeekday='true'
                price='0'
                discount='0'
                learnMoreLink='#'
                imageLink={course.url_image}
                categoryName={course.category}
                lecturer={course.author_name}
                reviews={course.number_reviews}
                score={course.score}
              />
            )
          )
        }
      </div>
    </div>
  )
}

export default CourseContainer;
