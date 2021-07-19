import React, { useState, useEffect } from 'react';

import CourseCard from './card';
import './styles.scss'
import { useProduct } from '../../contexts/product.context';
import { useProfile } from '../../contexts/profile.context';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component'
import 'animate.css';
const CourseContainer = ({
    categoriesRe
}) => {
    const [resgisters, setResgisters] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(0);
    let contextProfile = useProfile();

    useEffect(() => {
        let mounted = true;
        setTimeout(function () {
            contextProfile.getProfile()
                .then(items => {
                    if (mounted) {
                        setResgisters(items.data);
                        setProducts(items.data)
                        console.log(items.data);
                    }
                })
            contextProfile.getWishList()
                .then(items => {
                    if (mounted) {
                        setFavoriteList(items.data);
                    }
                })

            return () => mounted = false;

        }, 0)
    }, []);
    const handleRemove = (value) => {
        console.log(value);
        contextProfile.deleteWishList(value).then((res) => {
            const result = favoriteList.filter(function (el) { return el.product_id != value; });
            setFavoriteList(result);
            setProducts(result);
          //  addNoti('Remove favorite list successfully','success', 'remove')
        }).catch((err)=>{
         //   addNoti('Error favorite list successfully','danger', 'remove')
        })
    }
    const addNoti = (mes, type, title) => {
        store.addNotification({
          title: title,
          message: mes,
          type: type,
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      }

    return (
        <div className="course-container">
            
            <div className="buttons">
            <ReactNotification />
                <button
                    className={selected === 0 && 'active'}
                    onClick={() => {
                        setSelected(0);
                        setProducts(resgisters);
                    }}
                >
                    Your Couses
                </button>
                <button
                    className={selected === 1 && 'active'}
                    onClick={() => {
                        setSelected(1);
                        setProducts(favoriteList);
                    }}
                >

                    Favorite list
                </button>

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
                                categoryName={course.category_name}
                                lecturer={course.full_name}
                                reviews={course.number_reviews}
                                score={course.score}
                                productId={course.product_id}
                                selected={selected}
                                handleRemove={handleRemove}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default CourseContainer;
