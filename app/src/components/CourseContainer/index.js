import React, { useState, useEffect } from 'react';

import CourseCard from 'components/CourseCard';
import './styles.scss'
import { useProduct } from '../../contexts/product.context';
const CourseContainer = ({
  categoriesRe
}) => {
  const [cate, setCate] = useState(categoriesRe[0]);
  const [products, setProducts] = useState([]);
  let context = useProduct();
  useEffect(() => {

    let entity = {
      category_id: cate._id
    }
    let mounted = true;
    if (mounted) {
      updateProducts(entity);
    }

    return () => mounted = false;
  }, [])
  let updateProducts = (query) => {
    context.getProductByQuery(query)
      .then(items => {
        setProducts(items.data.records);
        return;
      })
  }
  const handleOnclick = (type) => {

  }
  return (
    <div className="course-container">
      <div className="buttons">
        {categoriesRe.map(
          (type, index) => (
             (index>= 2) ? ''
              :
              <button
                className={type._id === cate._id && 'active'}
                onClick={() => {
                  setCate(type);
                  updateProducts({ category_id: type._id });
                }}
              >
                {`${type.name}`}
              </button>
            

        )
        )
        }
      </div>
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
                productId={course._id}
              />
            )
          )
        }
      </div>
    </div>
  )
}

export default CourseContainer;
