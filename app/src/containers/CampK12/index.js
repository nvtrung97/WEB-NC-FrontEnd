import React, { useState } from 'react';
import './styles.scss';

import GroupImg from 'static/group-40.svg';
import HomeImg from 'static/home.svg';
import MedalImg from 'static/medal.svg';
import TabletImg from 'static/tablet.svg';

import BannerCard from 'components/BannerCard';
import CourseContainer from 'components/CourseContainer';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const COURSE_DATA = [
  {
    title: "AI for beginners:",
    subTitle: "Introduction to AI agents",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "5600",
    hours: "12",
    sessions: "6",
    isWeekend: false,
    isWeekday: true,
    price: "10000",
    discount: "50",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: false,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "5600",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "16000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "5600",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "Introduction to Data Science",
    subTitle: "Become a data scientist",
    level: "1",
    gradeRange: "9-12",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "9-12",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "9-12",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "9-12",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "5-8",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "Introduction to web development",
    subTitle: "Learn to make websites",
    level: "1",
    gradeRange: "1-4",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "React Js",
    subTitle: "Ecommerce website",
    level: "1",
    gradeRange: "1-4",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "HTML",
    subTitle: "Emailer template",
    level: "1",
    gradeRange: "1-4",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
  {
    title: "AI & Machine Learning:",
    subTitle: "Code intelligent Bots",
    level: "1",
    gradeRange: "1-4",
    happyStudents: "56000",
    hours: "12",
    sessions: "6",
    isWeekend: true,
    isWeekday: true,
    price: "12000",
    discount: "16",
    learnMoreLink: "https://google.com",
  },
];


const CampK12 = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  
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
      <div className="">
        <hr className="seperator" />
        <div className="carousel-wrapper">
          <Carousel breakPoints={breakPoints}>
            {items.map((item) => (
              <Item key={item}>{item}{item}</Item>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="book-button">
      </div>
      <CourseContainer
        gradeRanges={["1-4", "5-8", "9-12"]}
        coursesData={COURSE_DATA}
      />

    </div>
  )
};

export default CampK12;
