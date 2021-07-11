import React from 'react';

import TimerImage from 'static/timer.svg';
import GrowthImage from 'static/growth.svg';
import CommunityImage from 'static/community.svg';
import RupeesImage from 'static/rupees.svg';
import OfferImage from 'static/offer.svg';
import './style.css';
import './styles.scss';
import { Link } from 'react-router-dom';

const CourseCard = ({
  title,
  happyStudents,
  hours,
  sessions,
  isWeekend,
  isWeekday,
  price,
  discount,
  learnMoreLink,
  imageLink,
  categoryName
}) => (
  <div className="course-card">
    {imageLink?<div className="edit_mainge_ok" ><img alt="" className="edit_mainge" src='https://brandslogos.com/wp-content/uploads/images/large/java-logo-1.png' /></div>
    : <div className="card-image" />}
    
 
    <div className="card-body">
      <div className="title">
        <h6>
          {title}
        </h6>
      </div>
      <div className="details">
        <div className="detail">
          <img alt="" src={GrowthImage} />
          <p><b>{parseFloat(happyStudents / 1000)}k</b> Happy Students</p>
        </div>
        <div className="detail">
          <img alt="" src={TimerImage} />
          <p><b>{hours} Hours</b> over <span>{sessions}</span> Sessions</p>
        </div>
        <div className="detail">
          {(isWeekday || isWeekend) && <img alt="" src={CommunityImage} />}
          <p>
            {isWeekend && 'Weekend'}
            {(isWeekend && isWeekday) && ' and '}
            {isWeekday && 'Weekday'}
            {' Batches'}
          </p>
      
        </div>
        <div className="detail">
        <img alt="" src={TimerImage} />
        <p>
            {categoryName}
          </p>
      
        </div>

      </div>

      <div className="price-offer">
        <div className="price">
       
        <div className="detail">

        </div>
        </div>
      </div>

      <div className="link">
        <Link onClick={(e) => e.preventDefault()} to={learnMoreLink}>
          LEARN MORE
        </Link>
      </div>
    </div>
  </div>
)

export default CourseCard;