import React, { useState, useEffect } from 'react';

import CourseCard from 'components/CourseCard';
import './styles.scss'
import { useProduct } from '../../contexts/product.context';
import Pagination from '@material-ui/lab/Pagination';


const CourseContainer = ({
    query,

}) => {
    const [queryProp, setQueryProp] = useState(query);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    let context = useProduct();
    useEffect(() => {

        let mounted = true;
        if (mounted)
            updateProducts(queryProp);
        return () => mounted = false;
    }, [])
    let updateProducts = (query) => {
        console.log(query);
        context.getSearch(query)
            .then(items => {
                console.log(items);
                setProducts(items.data.records);
                setTotalPage(items.data.totalPage);
                setPage(items.data.page);
                return;
            })
    }
    const handleOnclick = (type) => {

    }
    const handleChangePage = (event, value) => {
        updateProducts({ ...queryProp, page: value });

        console.log(value);
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
            <Pagination count={totalPage} defaultPage={page} color="primary" className="paginationsize" style={{ marginTop: '20px' }} onChange={handleChangePage} />
        </div>
    )
}

export default CourseContainer;
