import React, { useState, useEffect } from 'react';
import './styles.scss';

import GroupImg from 'static/group-40.svg';
import HomeImg from 'static/home.svg';
import MedalImg from 'static/medal.svg';
import TabletImg from 'static/tablet.svg';

import BannerCard from 'components/BannerCard';
import CourseContainer from 'components/CourseContainer';
import Carousels from "react-elastic-carousel";
import { useProduct } from '../../contexts/product.context';
import { useCategory } from '../../contexts/categories.context';
import CourseCard from 'components/CourseCard';
import { Carousel } from '3d-react-carousal';
let slides = [
  <img src="https://toidammeit.files.wordpress.com/2016/07/499292_1aeb_2.jpg" alt="1" />,
  <img src="https://braniumacademy.net/wp-content/uploads/2020/08/Banner_Java_2.png" alt="2" />,
  <img src="https://codeschool.vn/wp-content/uploads/2020/06/featured-nodejs-course.jpg" alt="3" />,
  <img src="http://newsky.edu.vn/wp-content/uploads/khoa-hoc-tieng-anh-cho-nguoi-mat-goc.jpg" alt="4" />,
  <img src="https://media-kyna.cdn.vccloud.vn/uploads/courses/273/img/image_url.jpg" alt="5" />];
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const Home = () => {
  const [cateRegis, setCateRegis] = useState([{
    "_id": 1,
    "name": "Khóa học lập trình",
    "count": 2
  }]);
  const [highLight, setHighLight] = useState([]);
  const [mostOfView, setMostOfView] = useState([]);
  let contextCate = useCategory();
  const [lastest, setLastest] = useState([]);
  let context = useProduct();
  useEffect(() => {
    let mounted = true;
    context.getHighlightWeek()
      .then(items => {
        if (mounted) {
          setHighLight(items.data)
        }
      })
    context.mostOfViews()
      .then(items => {
        if (mounted) {
          setMostOfView(items.data)
        }
      })
    context.getLastest()
      .then(items => {
        if (mounted) {
          setLastest(items.data)
        }
      })
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
        ONLINE COURSES
      </h1>

      <div className="banner-cards">
        <BannerCard
          image={GroupImg}
          title="Learn interactively."
          description="LIVE online sessions with our expert mentors."
          link="https://www.google.com"
          linkText="See a demo."
        />
        <BannerCard
          image={HomeImg}
          title="Learn from anywhere"
          description="Convenience and safety for you and your child."
        />
        <BannerCard
          image={MedalImg} title="Learn from the pioneers."
          description="We've been teaching kids to code since 2010."
          link="www.google.com"
          linkText="Read more."
        />
        <BannerCard
          image={TabletImg}
          title="Learn by doing."
          description="100% project-based curriculum. Solve real-world problems."
        />
      </div>

      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" style={{ marginBottom: '50px' }} />
        <Carousel slides={slides} autoplay={false} interval={1000} />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Featured course of the past week</p>
          <div className="carousel-wrapper" style={{ marginTop: '60px' }}>
            <Carousels breakPoints={breakPoints} style={{ marginTop: '50px' }}>
              {highLight.map((item) => (
                <CourseCard
                  title={item.name}
                  subTitle={item.category}
                  happyStudents='1000'
                  hours='100h'
                  sessions="6"
                  isWeekend='true'
                  isWeekday='true'
                  price='0'
                  discount='0'
                  learnMoreLink='#'
                  imageLink={item.url_image}
                  categoryName={item.category}
                  lecturer={item.author_name}
                  reviews={item.number_reviews}
                  score={item.score}
                  productId = {item._id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Courses with the most views</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {mostOfView.map((item) => (
                <CourseCard
                  title={item.name}
                  subTitle={item.category}
                  happyStudents='1000'
                  hours='100h'
                  sessions="6"
                  isWeekend='true'
                  isWeekday='true'
                  price='0'
                  discount='0'
                  learnMoreLink='#'
                  imageLink={item.url_image}
                  categoryName={item.category}
                  lecturer={item.author_name}
                  reviews={item.number_reviews}
                  score={item.score}
                  productId = {item._id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Latest courses</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {lastest.map((item) => (
                <CourseCard
                  title={item.name}
                  subTitle={item.category}
                  happyStudents='1000'
                  hours='100h'
                  sessions="6"
                  isWeekend='true'
                  isWeekday='true'
                  price='0'
                  discount='0'
                  learnMoreLink='#'
                  imageLink={item.url_image}
                  categoryName={item.category}
                  lecturer={item.author_name}
                  reviews={item.number_reviews}
                  score={item.score}
                  productId = {item._id}
                />

              ))}
            </Carousels>
          </div>
        </div>
      </div>
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" />
        <div style={{  padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Categories are most subscribed to in the past week</p>
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

export default Home;
