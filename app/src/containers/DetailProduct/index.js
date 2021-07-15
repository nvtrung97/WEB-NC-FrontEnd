import React, { useState, useRef, useEffect } from 'react';
import Colors from '../../components/Colors'
import DetailsThumb from '../../components/DetailsThumb';
import './style.css'
import { useProduct } from '../../contexts/product.context';
import { useProfile } from '../../contexts/profile.context';
import { useAuth } from '../../contexts/auth.context';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useParams } from "react-router";
import Rating from '@material-ui/lab/Rating';
import CourseCard from 'components/CourseCard';
import { BoxLoading } from 'react-loadingg';
import { makeStyles } from '@material-ui/core/styles';
import reviewImage from '../../static/review.svg';
import Carousels from "react-elastic-carousel";
import moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Review from './reviews/index';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
let imagesThum = [
  "http://tiasang.com.vn/Portals/0/Images/Dao-tao-KHDL-anh-1.jpg",
  "https://cdn.vietnambiz.vn/2019/10/15/1nvhe7mchqmjbgyvx-uobra-15711056360651103109227.png",
  "https://duhocue.edu.vn/public/uploads/images/hinh-tin-tuc/Nganh-khoa-hoc-may-tinh-nam-2019-top-5-truong-dai-hoc-nen-lua-chon.jpg",
];
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];
const DetailPage = () => {
  const reviewValueSend = useRef('')
  const classes = useStyles();
  let contextProduct = useProduct();
  let contextProfile = useProfile();
  const [productSuchas, setProductSuchas] = useState([]);
  const { id } = useParams();
  let { authenticated } = useAuth();
  const [products, setProducts] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLearn, setIsLearn] = useState(true);
  const [videos, setVideos] = useState([]);
  const [imageThunal, setImageThunal] = useState(['https://thietkegame.com/wp-content/uploads/2020/03/loading-8bit.jpg']);
  let history = useHistory()
  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      contextProduct.getDetailProductById(id)
        .then(items => {
          if (mounted) {
            setProducts(items.data);
            imagesThum.unshift(items.data.url_image);
            setVideos(items.data.videos);
            setImageThunal(imagesThum);
            setIsLearn(items.data.registered);
            contextProduct.getProductByQuery({ category_id: items.data.category_id })
              .then(it => {
                if (mounted) {
                  const result = it.data.records.filter(function (el) { return el._id != items.data._id; });
                  setProductSuchas(result);
                }
              })
          }
        })
      contextProduct.getAllReviews(id).then((res) => {
        setReviews(res.data.reverse());
      }).catch((err) => {
        console.log(err);
      })
    }, 0);
    return () => mounted = false;
  }, [])
  const [index, setIndex] = useState(0)
  let myRef = React.createRef();

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const handleJoin = () => {
    if (authenticated) {
      contextProfile.registerCourese({ product_id: id }).then((res) => {
        alert("Register success");
        history.push(`/detail/${id}/videos`)
      }).catch((err) => {
        alert("Something wrong");
      })
    } else {
      history.push('/signin')
    }
  }
  const handleJoinLearnContinue = () => {
    history.push(`/detail/${id}/videos`)
  }
  const [rate, setRate] = useState(5);
  const sendReviews = () => {
    let entity = {
      score: rate,
      content: reviewValueSend.current.value
    }
    contextProduct.createReview(entity, id).then((res) => {
      console.log(res);
    }).catch((rerr) => {
      console.log(rerr);
    })
    console.log(entity);
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
  return (
    <div className="app123">
      {
        products ? (
          <div className="details123" >
            <div className="big-img123">
              <img src={imageThunal[index]} alt="" />
              <h1>Reviews</h1>

              <FormControl className={classes.margin} style={{ marginLeft: '20px' }}>
                <InputLabel htmlFor="input-with-icon-adornment">Reviews content</InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  inputRef={reviewValueSend}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }

                />
                <Rating style={{ marginTop: '10px' }}
                  name="simple-controlled"
                  value={rate}
                  onChange={(event, newValue) => {
                    setRate(newValue);
                  }}
                />
              </FormControl>

              <Button
                style={{ marginTop: '13px', marginLeft: '10px', background: '#50a3ec47' }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={sendReviews}
              >
                Send
              </Button>


              {reviews.length == 0 ? <div style ={{marginTop:'20px'}}>No reviews</div> :
                <Review reviews={reviews} />
              }

            </div>
            <div className="box">
              <div className="row">
                <h2>{products.name}</h2>
                {isLearn ? <FavoriteIcon style={{ color: 'red', fontSize:'40px' }} /> : <span style={{ color: '#bb495e' }}>Free</span>}



              </div>


              <Colors colors={["red", "black", "crimson", "teal"]} />
              <p><b>Author: </b> {products.full_name}</p>
              <p><Rating name="disabled" value={products.score} readOnly style={{ marginRight: '20px' }} />
              </p>
              <p>
                {'    ' + products.number_reviews + ' reviews '}
                {'+    ' + products.number_students + ' students'}
              </p>
              <p><b>Detail: </b> {products.short_description}</p>
              <p>{products.full_description}</p>
              <p style={{ opacity: 0.4, fontStyle: 'oblique', fontSize: '13px' }}><b>Update at: </b>{moment(products.update_at).format("hh:mm DD/MM/YYYY")}</p>
              <DetailsThumb images={imageThunal} tab={handleTab} myRef={myRef} />
              {
                isLearn ? <button className="cart" style={{ backgroundColor: 'rgb(197 185 38)' }} onClick={handleJoinLearnContinue}>Learn continue</button> :
                  <button className="cart" style={{ backgroundColor: 'rgb(197 185 38)' }} onClick={handleJoin}>Join</button>

              }


              <Accordion style={{
                background: 'none',
                marginTop: '20px',
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Video details</Typography>
                </AccordionSummary>

                {videos.map((video, index) => (
                  <div>
                    <AccordionDetails>
                      <Typography>
                        {index}: {video.name}
                      </Typography>

                    </AccordionDetails>
                    <hr className="seperator" style={{ opacity: '0.5' }} />
                  </div>
                ))}
                <AccordionDetails>
                  <Typography>
                    More ...
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

          </div>
        ) : <BoxLoading />

      }
      <div className="ok_setthoi" style={{ marginBottom: '50px' }}>
        <hr className="seperator" style={{ width: '80%' }} />
        <div style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)', padding: '20px' }}>
          <p style={{ textAlign: "center", color: 'white', fontSize: '30px' }}>Suggest courses of the same category</p>
          <div className="carousel-wrapper" style={{ marginTop: '50px' }}>
            <Carousels breakPoints={breakPoints}>
              {productSuchas.map((item) => (
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
                  productId={item._id}
                />
              ))}
            </Carousels>
          </div>
        </div>
      </div>
    </div >
  );
}

export default DetailPage;
//<img src={item.src[index]} alt="" />
//
// <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />